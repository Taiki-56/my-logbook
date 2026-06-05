# API Specification

## Overview

### Frontend

- Next.js App Router
- TanStack Query

### Backend

- Next.js Route Handlers
- FastAPI

### Authentication

- JWT
- HttpOnly Cookie

---

# Authentication APIs

## Login

### POST /api/auth/login

Authentication: None

Request

```json
{
  "email": "admin@example.com",
  "password": "password"
}
```

Response

```json
{
  "success": true,
  "user": {
    "email": "admin@example.com"
  }
}
```

---

## Logout

### POST /api/auth/logout

Authentication: Required

Response

```json
{
  "success": true
}
```

---

## Current User

### GET /api/auth/me

Authentication: Required

Response

```json
{
  "id": 1,
  "email": "admin@example.com"
}
```

---

# Post APIs

## Create Post

### POST /api/posts

Authentication: Required

Request

```json
{
  "status": "DRAFT"
}
```

Response

```json
{
  "id": 1
}
```

---

## Get Posts

### GET /api/posts

Authentication: Required

Query Parameters

```text
page
limit
status
search
```

Response

```json
{
  "items": [],
  "total": 100
}
```

---

## Get Post

### GET /api/posts/:id

Authentication: Required

Response

```json
{
  "id": 1,
  "status": "DRAFT"
}
```

---

## Update Post

### PATCH /api/posts/:id

Authentication: Required

Request

```json
{
  "status": "PUBLISHED"
}
```

Response

```json
{
  "success": true
}
```

---

## Delete Post

### DELETE /api/posts/:id

Authentication: Required

Response

```json
{
  "success": true
}
```

---

# Translation APIs

## Create Translation

### POST /api/posts/:id/translations

Authentication: Required

Request

```json
{
  "locale": "JA",
  "title": "ベンチプレス100kg達成",
  "html": "<h1>Hello</h1>",
  "css": "",
  "projectData": "{}"
}
```

Response

```json
{
  "id": 1
}
```

---

## Update Translation

### PATCH /api/translations/:id

Authentication: Required

Request

```json
{
  "title": "更新タイトル"
}
```

Response

```json
{
  "success": true
}
```

---

## Get Translation

### GET /api/translations/:id

Authentication: Required

Response

```json
{
  "id": 1,
  "locale": "JA",
  "title": "..."
}
```

---

# Tag APIs

## Create Tag

### POST /api/tags

Authentication: Required

Request

```json
{
  "name": "筋トレ"
}
```

Response

```json
{
  "id": 1
}
```

---

## Get Tags

### GET /api/tags

Authentication: Required

Response

```json
{
  "items": []
}
```

---

## Delete Tag

### DELETE /api/tags/:id

Authentication: Required

Response

```json
{
  "success": true
}
```

---

# Media APIs

## Upload Media

### POST /api/media/upload

Authentication: Required

Content-Type

```text
multipart/form-data
```

Response

```json
{
  "id": 1,
  "publicId": "blog/abc123",
  "url": "https://res.cloudinary.com/..."
}
```

---

## List Media

### GET /api/media

Authentication: Required

Response

```json
{
  "items": []
}
```

---

## Delete Media

### DELETE /api/media/:id

Authentication: Required

Response

```json
{
  "success": true
}
```

---

# Public APIs

## Get Published Posts

### GET /api/public/posts

Authentication: None

Query Parameters

```text
page
limit
locale
tag
search
```

Response

```json
{
  "items": [],
  "total": 100
}
```

---

## Get Post By Slug

### GET /api/public/posts/:slug

Authentication: None

Response

```json
{
  "title": "...",
  "html": "..."
}
```

---

## Search Posts

### GET /api/public/search

Authentication: None

Query Parameters

```text
q
locale
```

Response

```json
{
  "items": []
}
```

---

# AI APIs (FastAPI)

Base URL

```text
/api/ai
```

---

## Translate Article

### POST /api/ai/translate

Authentication: Required

Request

```json
{
  "title": "ベンチプレス100kg達成",
  "content": "..."
}
```

Response

```json
{
  "en": {
    "title": "...",
    "content": "..."
  },
  "fr": {
    "title": "...",
    "content": "..."
  }
}
```

---

## Generate Tags

### POST /api/ai/tags

Authentication: Required

Request

```json
{
  "content": "..."
}
```

Response

```json
{
  "tags": ["筋トレ", "ベンチプレス", "ボディビル"]
}
```

---

## Generate SEO

### POST /api/ai/seo

Authentication: Required

Request

```json
{
  "title": "...",
  "content": "..."
}
```

Response

```json
{
  "seoTitle": "...",
  "seoDescription": "..."
}
```

---

## Generate Embedding

### POST /api/ai/embeddings

Authentication: Required

Request

```json
{
  "content": "..."
}
```

Response

```json
{
  "embeddingId": 1
}
```

---

## Related Articles

### GET /api/ai/related/:postId

Authentication: None

Response

```json
{
  "items": [
    {
      "postId": 10,
      "title": "関連記事"
    }
  ]
}
```

---

# Error Response

All APIs must follow this format.

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request"
  }
}
```

---

# HTTP Status Codes

```text
200 OK

201 Created

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

422 Validation Error

500 Internal Server Error
```
