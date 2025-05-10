import {
  getImage as getImageFromFirebase,
  getTotalImage as getTotalImageFromFirebase,
} from '@/utils/firebase/get';

/**
 * 특정 이벤트 ID에서 하나의 이미지를 가져오는 wrapper 함수
 * @param {string} eventid - 이벤트 ID
 * @param {string} filename - 이미지 파일 이름 (확장자 제외)
 * @returns {Promise<Object|null>}
 */
export async function getImage(eventid, filename) {
  return await getImageFromFirebase(eventid, filename);
}

/**
 * 특정 이벤트 ID에 포함된 모든 이미지를 가져오는 wrapper 함수 (alias)
 * @param {string} eventid - 이벤트 ID
 * @returns {Promise<Array<Object>>}
 */
export async function getTotalImage(eventid) {
  return await getTotalImageFromFirebase(eventid);
}