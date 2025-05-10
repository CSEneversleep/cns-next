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
 * 유저 데이터를 생성합니다.
 * @param {string} username - 사용자 이름 (문서 ID)
 * @param {Array<string>} folders - 사용자의 폴더 리스트
 * @param {string} fullname - 사용자 전체 이름
 * @returns {Promise<void>}
 */
export async function makeUser(username, folders, fullname) {
  const userData = {
    folders,
    fullname,
  };
  await db.collection('user').doc(username).set(userData);
}

/**
 * 유저 데이터를 가져옵니다.
 * @param {string} username - 사용자 이름 (문서 ID)
 * @returns {Promise<Object|null>} - 유저 데이터 또는 null
 */
export async function getUser(username) {
  const docRef = db.collection('user').doc(username);
  const snapshot = await docRef.get();

  if (!snapshot.exists) return null;
  return { id: snapshot.id, ...snapshot.data() };
}