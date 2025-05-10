import admin from 'firebase-admin';

// Firebase Service Account
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}

const db = admin.firestore();

/**
 * Firestore에 이미지 메타데이터 문서를 저장합니다.
 * @param {string} eventid - 컬렉션 이름 (이벤트 ID)
 * @param {string} filename - 파일 이름 (확장자 없이)
 * @param {Object} data - 저장할 메타데이터 (title 등)
 */
export async function uploadImage(eventid, filename, data = {}) {
  const docRef = db.collection(eventid).doc(filename);

  const now = new Date(Date.now() + 9 * 60 * 60 * 1000); // KST
  const dateStr = now.toISOString().split('T')[0];       // YYYY-MM-DD
  const timestamp = Date.now();

  await docRef.set({
    filename,
    date: dateStr,
    datetime: timestamp,
    ...data,
  });

  return { success: true };
}