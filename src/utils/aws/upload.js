// @/server/aws/upload.js
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_AFTGLOW_REGION,
  credentials: {
    accessKeyId: process.env.AWS_AFTGLOW_ACCESS_KEY,
    secretAccessKey: process.env.AWS_AFTGLOW_SECRET_KEY,
  },
});

const extMap = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

/**
 * 이미지 파일을 S3에 업로드합니다.
 * @param {string} username - 사용자 폴더 이름 (최상위 경로)
 * @param {string} folder - 논리적 폴더 이름
 * @param {string} filename - 확장자 없이 저장할 파일 이름
 * @param {Buffer|string|Uint8Array} content - 이미지 데이터
 * @param {string} contentType - 'image/jpeg', 'image/png', 'image/webp' 중 하나
 * @returns {Promise<string>} - 업로드된 이미지의 public URL
 */
export async function uploadImage(username, folder, filename, content, contentType) {
  const ext = extMap[contentType];
  if (!ext) throw new Error(`Unsupported contentType: ${contentType}`);

  const bucket = process.env.AWS_AFTGLOW_IMAGE_BUCKET;
  const key = `${username}/${folder}__${filename}.${ext}`;

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: content,
    ContentType: contentType,
    ACL: 'public-read',
  });

  await s3.send(command);

  return getImageUrl(username, folder, filename, contentType);
}

/**
 * 업로드된 이미지의 S3 공개 URL을 생성합니다.
 * @param {string} username - 사용자 폴더 이름
 * @param {string} folder - 논리적 폴더 이름
 * @param {string} filename - 확장자 없는 파일 이름
 * @param {string} contentType - MIME 타입 ('image/jpeg', ...)
 * @returns {string} - 이미지 URL
 */
export function getImageUrl(username, folder, filename, contentType) {
  const ext = extMap[contentType];
  if (!ext) throw new Error(`Unsupported contentType: ${contentType}`);

  const bucket = process.env.AWS_AFTGLOW_IMAGE_BUCKET;
  const region = process.env.AWS_AFTGLOW_REGION;
  const key = `${username}/${folder}__${filename}.${ext}`;

  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}