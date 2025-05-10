import admin from 'firebase-admin';

// Firebase 초기화
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

/**
 * 이벤트 데이터를 생성합니다.
 * @param {string} id - 문서 ID
 * @param {string} eventname - 이벤트 이름
 * @param {Object} data - 추가 데이터
 * @returns {Promise<void>}
 */
export async function makeEvent(id, eventname, data = {}) {
  const eventData = {
    eventname,
    ...data,
  };
  await db.collection('event').doc(id).set(eventData);
}

/**
 * 이벤트 데이터를 가져옵니다.
 * @param {string} id - 문서 ID
 * @returns {Promise<Object|null>} - 이벤트 데이터 또는 null
 */
export async function getEvent(id) {
  const docRef = db.collection('event').doc(id);
  const snapshot = await docRef.get();

  if (!snapshot.exists) return null;
  return { id: snapshot.id, ...snapshot.data() };
}