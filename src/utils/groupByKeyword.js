/**
 * photos: [{ id, s3Url, tags: ["햄버거", "사람"] }, ...]
 * return: { "햄버거": [photo0, photo3, ...], "사람": [...] }
 */
export function groupPhotosByKeyword(photos) {
  const groups = {};

  photos.forEach((photo) => {
    photo.tags.forEach((raw) => {
      const tag = raw.trim().toLowerCase();      // 태그 정규화
      if (!groups[tag]) groups[tag] = [];
      groups[tag].push(photo);
    });
  });

  return groups;
}