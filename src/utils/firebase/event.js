// @/utils/firebase/event.js

import { randomUUID } from 'crypto';
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
 * 새로운 이벤트를 생성하고 ID를 반환합니다.
 * @param {string} eventname - 이벤트 이름
 * @param {Object} data - 추가 메타데이터 (선택)
 * @returns {Promise<string>} - 생성된 이벤트 ID
 */
export async function makeEvent(eventname, data = {}) {
  if (!eventname) throw new Error('eventname is required');

  const id = randomUUID().slice(0, 12);
  const eventData = {
    eventname,
    ...data,
  };

  await db.collection('event').doc(id).set(eventData);
  return id;
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