import {
  getImage as getImageFromFirebase,
  getAllImage as getAllImageFromFirebase
} from '@/utils/firebase/get';

/**
 * 특정 이미지를 가져오는 wrapper 함수
 * @param {string} username
 * @param {string} folder
 * @param {string} filename
 * @returns {Promise<Object|null>}
 */
export async function getImage(username, folder, filename) {
  return await getImageFromFirebase(username, folder, filename);
}

/**
 * 특정 폴더에 속한 모든 이미지를 가져오는 wrapper 함수
 * @param {string} username
 * @param {string} folder
 * @returns {Promise<Array<Object>>}
 */
export async function getAllImage(username, folder) {
  return await getAllImageFromFirebase(username, folder);
}