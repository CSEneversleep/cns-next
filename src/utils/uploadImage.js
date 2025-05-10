import { uploadImage as uploadToS3 } from '@/utils/aws/upload';
import { uploadImage as uploadToFirestore } from '@/utils/firebase/upload';
import { randomUUID } from 'crypto';

/**
 * Base64 또는 Data URL에서 MIME 타입과 Buffer 추출
 * @param {string} content - 이미지 base64 문자열 또는 data URL
 * @returns {{ contentType: string, buffer: Buffer }}
 */
function parseBase64Image(content) {
  const match = content.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!match) throw new Error('Invalid content format: must be data URL base64 string');

  const contentType = match[1]; // ex: image/png
  const base64Data = match[2];
  const buffer = Buffer.from(base64Data, 'base64');

  return { contentType, buffer };
}

/**
 * 이미지를 S3와 Firestore에 업로드하고 정보를 반환합니다.
 * @param {string} username - 사용자 이름
 * @param {string} folder - 논리적 폴더 이름
 * @param {string} content - 이미지 데이터 (data URL 형식)
 * @param {Object} metadata - 메타데이터 (title 필수)
 * @returns {Promise<Object>} - { title, ..., contentType, src }
 */
export async function uploadImage(username, folder, content, metadata) {
  if (!metadata?.title) throw new Error('metadata.title is required');
  if (!content) throw new Error('content is required');

  const { contentType, buffer } = parseBase64Image(content);
  const filename = randomUUID().slice(0, 12);

  const src = await uploadToS3(username, folder, filename, buffer, contentType);

  const fullData = {
    ...metadata,
    contentType,
    src,
  };

  await uploadToFirestore(username, folder, filename, fullData);
  return fullData;
}