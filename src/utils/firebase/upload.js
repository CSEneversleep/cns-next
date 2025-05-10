// @/server/firebase/upload.js
import admin from 'firebase-admin';

// Firebase Service Account
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount), });
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

  await docRef.set({
    folder,
    filename,
    title: data.title || '',
    date: admin.firestore.FieldValue.serverTimestamp(),
    ...data,
  });

  return { success: true };
}