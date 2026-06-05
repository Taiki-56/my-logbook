# Architecture

## Overview

本システムは個人向け多言語ブログプラットフォームである。

管理者は日本語で記事を作成し、AIを利用して英語・フランス語の記事を生成できる。

また、AIを利用した以下の機能を提供する。

- 翻訳
- タグ生成
- SEO分析
- 関連記事推薦
- Embedding生成

---

# System Architecture

```text
Browser
    │
    ▼
Next.js (Vercel)
    │
    ├─ Public Site
    ├─ Admin Site
    ├─ Authentication
    ├─ Route Handlers
    ├─ Server Actions
    └─ Prisma
    │
    ▼
MySQL
    │
    ▼
Cloudinary

Next.js
    │
    ▼
FastAPI
    │
    ├─ Translation Service
    ├─ Tag Generation Service
    ├─ SEO Analysis Service
    ├─ Embedding Service
    └─ Related Article Service
    │
    ▼
Gemini API
```

---

# Frontend

## Framework

- Next.js App Router
- TypeScript

## UI

- Tailwind CSS

## Form

- React Hook Form
- Zod

## Data Fetching

- TanStack Query

## Internationalization

- next-intl

## Editor

- GrapesJS

---

# Backend

## Main API

Next.js Route Handlers

Responsibilities

- Authentication
- CRUD Operations
- Media Upload
- Public APIs
- Admin APIs

---

## AI Service

FastAPI

Responsibilities

- Translation
- Tag Generation
- SEO Analysis
- Embedding Generation
- Related Article Recommendation

---

# Database

## Database

MySQL

## ORM

Prisma

---

# Authentication

## Method

JWT Authentication

## Storage

HttpOnly Cookie

## Flow

```text
Login

↓

Verify Password

↓

Generate JWT

↓

Store Cookie

↓

Authenticated Request
```

---

# Media Storage

## Provider

Cloudinary

## Upload Flow

```text
GrapesJS

↓

Upload Image

↓

Cloudinary

↓

Save URL

↓

Store HTML
```

---

# AI Provider

Primary Provider

- Gemini

Future Providers

- Claude
- OpenAI

Provider switching should be implemented using Adapter Pattern.

---

# Translation Flow

```text
Japanese Article

↓

FastAPI

↓

Gemini

↓

English Translation

↓

French Translation

↓

Save Draft
```

---

# Tag Generation Flow

```text
Article

↓

Gemini

↓

Generated Tags

↓

Admin Review

↓

Save
```

---

# SEO Analysis Flow

```text
Article

↓

FastAPI

↓

SEO Analyzer

↓

Score

↓

Suggestions
```

Example

- Missing headings
- Long title
- Missing meta description
- Keyword density issues

---

# Related Article Flow

```text
Article

↓

Embedding Generation

↓

Store Vector

↓

Similarity Search

↓

Related Articles
```

---

# Embedding Strategy

Each article translation generates an embedding vector.

Supported locales

- JA
- EN
- FR

Embeddings are stored in database.

Future migration to Vector Database should be possible.

Examples

- pgvector
- Pinecone
- Weaviate
- Qdrant

---

# Deployment

## Frontend

Platform

- Vercel

Responsibilities

- Next.js
- Public Site
- Admin Site

---

## Backend

Platform

- Railway
- VPS
- Docker

Responsibilities

- FastAPI

---

## Database

Platform

- MySQL

---

## Storage

Platform

- Cloudinary

---

# Logging

## Application Logs

- Next.js Logs
- FastAPI Logs

## AI Logs

Stored in

- ai_generation_logs

---

# Monitoring

Future Scope

- Sentry
- OpenTelemetry
- Grafana

---

# Security

## Authentication

- JWT
- HttpOnly Cookie

## Web Security

- XSS Protection
- CSRF Protection
- SQL Injection Protection

## Password Storage

- bcrypt

---

# Scalability

Future Features

- User Accounts
- Comments
- Favorites
- Newsletter
- Analytics
- RAG Search
- Semantic Search
- AI Chat Assistant

Architecture should remain extensible for future microservices.

```

```
