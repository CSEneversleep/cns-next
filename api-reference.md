# Afterglow API reference suite

> 작성책임자 강명석  
> 최신개정일 2025-05-10

## Upload Image

- **Method**: `POST`  
- **URL**: `/api/server-upload`  
- **Description**:  
  사용자가 업로드한 이미지(`content`)와 메타데이터(`metadata`)를 받아 AWS S3에 저장하고, Firestore에 메타데이터를 기록합니다.

---

### Request Body (JSON)

```json
{
  "username": "kms",
  "folder": "math",
  "content": "data:image/png;base64,...",
  "metadata": {
    "folder": "friend",
    "title": "SKYST 방문",
    "description": "24 동기들과 SKYST 방문해보았다. 재미있었다 흥미로웠다.",
    "peoples": [
      { "name": "김인서" },
      { "name": "김범준" },
      { "name": "이형주" }
    ],
    "lattitude": 37.5665,
    "longitude": 126.9780
  }
}
```

- `username` (`string`, 필수): Firestore 컬렉션 및 S3 루트 디렉토리 이름  
- `folder` (`string`, 필수): 논리적 폴더명 (문서 ID 및 S3 키에 사용됨)  
- `content` (`string`, 필수): 이미지 데이터 (data URL 형식: `data:image/png;base64,...`)  
- `metadata` (`object`, 필수): 이미지 메타데이터 객체  
  - `title` (`string`, 필수): 제목  
  - `description`, `peoples`, `lattitude`, `longitude`: 선택적 메타데이터

---

### 📤 Response (JSON)

```json
{
    "folder": "friend",
    "title": "SKYST 방문",
    "description": "24 동기들과 SKYST 방문해보았다. 재미있었다 흥미로웠다.",
    "peoples": [
      { "name": "김인서" },
      { "name": "김범준" },
      { "name": "이형주" }
    ],
    "lattitude": 37.5665,
    "longitude": 126.9780,
  "contentType": "image/png",
  "src": "https://your-bucket.s3.ap-northeast-1.amazonaws.com/kms/math__abc123def456.png"
}
```

---

### 🧾 Status Codes

| 코드 | 의미 |
|------|------|
| `200 OK` | 업로드 성공 |
| `400 Bad Request` | `metadata.title` 또는 `content` 누락 |
| `415 Unsupported Media Type` | 지원하지 않는 이미지 형식 |
| `500 Internal Server Error` | 서버 에러 발생 |
