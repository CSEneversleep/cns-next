import admin from 'firebase-admin';

// Firebase Service Account
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

/**
 * 특정 이벤트 ID에 해당하는 모든 이미지를 가져옵니다.
 * @param {string} eventid - 이벤트 ID (컬렉션 이름)
 * @returns {Promise<Array<Object>>} - 이미지 리스트
 */
export async function getTotalImage(eventid) {
  const snapshot = await db.collection(eventid).get();
  const results = [];
  snapshot.forEach(doc => {
    results.push({ id: doc.id, ...doc.data() });
  });
  return results;
}

/**
 * 특정 이벤트 ID에서 하나의 이미지를 가져옵니다.
 * @param {string} eventid - 이벤트 ID (컬렉션 이름)
 * @param {string} filename - 저장된 파일 이름 (확장자 제외)
 * @returns {Promise<Object|null>} - 이미지 데이터 또는 null
 */
export async function getImage(eventid, filename) {
  const docRef = db.collection(eventid).doc(filename);
  const snapshot = await docRef.get();

  if (!snapshot.exists) return null;
  return { id: snapshot.id, ...snapshot.data() };
}