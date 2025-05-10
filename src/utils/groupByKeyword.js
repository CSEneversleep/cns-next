/**
 * photos: [{ id, s3Url, tags: ["햄버거", "사람"] }, ...]
 * return: { "햄버거": [photo0, photo3, ...], "사람": [...] }
 */
export function groupPhotosByKeyword(photos) {
  const groups = Object.create(null);

  for (const photo of photos) {
    for (const tag of photo.tags) {
      if (!groups[tag]) groups[tag] = [];
      groups[tag].push(photo);
    }
  }
  return groups;
}