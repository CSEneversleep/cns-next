// @/server/firebase/upload.js
import admin from 'firebase-admin';

// Firebase Service Account
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}

const db = admin.firestore();

/**
 * Firestore에 이미지 메타데이터 문서를 저장합니다.
 * @param {string} username - 컬렉션 이름
 * @param {string} folder - 논리적 폴더명
 * @param {string} filename - 파일 이름
 * @param {Object} data - 저장할 메타데이터
 */
export async function uploadImage(username, folder, filename, data = {}) {
  const docId = `${folder}__${filename}`;
  const docRef = db.collection(username).doc(docId);

  const now = new Date(Date.now() + 9 * 60 * 60 * 1000); // KST 기준 시간
  const dateStr = now.toISOString().split('T')[0]; // 'YYYY-MM-DD'
  const timestamp = admin.firestore.Timestamp.fromDate(now);

  await docRef.set({
    folder,
    filename,
    title: data.title || '',
    date: dateStr,
    datetime: timestamp,
    ...data,
  });

  return { success: true };
}