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
 * 특정 폴더에 해당하는 모든 이미지를 가져옵니다.
 * @param {string} username - Firestore 컬렉션 이름
 * @param {string} folder - folder 명 (문서 ID가 이걸로 시작해야 함)
 * @returns {Promise<Array<Object>>} - 해당 폴더의 이미지 리스트
 */
export async function getAllImage(username, folder) {
  const snapshot = await db.collection(username).get();
  const results = [];

  snapshot.forEach(doc => {
    if (doc.id.startsWith(`${folder}__`)) {
      results.push({ id: doc.id, ...doc.data() });
    }
  });

  return results;
}

/**
 * 특정 folder/filename 조합에 해당하는 이미지를 하나 가져옵니다.
 * @param {string} username - Firestore 컬렉션 이름
 * @param {string} folder - 논리적 폴더 이름
 * @param {string} filename - 파일 이름
 * @returns {Promise<Object|null>} - 해당 이미지 데이터 또는 null
 */
export async function getImage(username, folder, filename) {
  const docId = `${folder}__${filename}`;
  const docRef = db.collection(username).doc(docId);
  const snapshot = await docRef.get();

  if (!snapshot.exists) return null;
  return { id: snapshot.id, ...snapshot.data() };
}