# Prisma Schema

## Enums

```prisma
enum PostStatus {
  DRAFT
  PUBLISHED
  PRIVATE
}

enum Locale {
  JA
  EN
  FR
}

enum AiGenerationType {
  TRANSLATION
  TAG_GENERATION
  SEO_ANALYSIS
  EMBEDDING_GENERATION
}

enum AiGenerationStatus {
  PENDING
  SUCCESS
  FAILED
}
```

---

## User

```prisma
model User {
  id           BigInt @id @default(autoincrement())

  email        String @unique
  passwordHash String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## Post

```prisma
model Post {
  id BigInt @id @default(autoincrement())

  status PostStatus @default(DRAFT)

  publishedAt DateTime?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  translations PostTranslation[]
  tags         PostTag[]
  aiLogs       AiGenerationLog[]
}
```

---

## PostTranslation

```prisma
model PostTranslation {
  id BigInt @id @default(autoincrement())

  postId BigInt

  locale Locale

  title String

  slug String @unique

  html String @db.LongText

  css String @db.LongText

  projectData String @db.LongText

  seoTitle String?

  seoDescription String? @db.Text

  isAiGenerated Boolean @default(false)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  post Post @relation(fields: [postId], references: [id])

  embeddings PostEmbedding[]

  @@unique([postId, locale])
}
```

---

## PostEmbedding

```prisma
model PostEmbedding {
  id BigInt @id @default(autoincrement())

  postTranslationId BigInt

  locale Locale

  embeddingModel String

  vector Json

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  translation PostTranslation
    @relation(
      fields: [postTranslationId],
      references: [id]
    )
}
```

---

## Tag

```prisma
model Tag {
  id BigInt @id @default(autoincrement())

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  translations TagTranslation[]
}
```

---

## TagTranslation

```prisma
model TagTranslation {
  id BigInt @id @default(autoincrement())

  tagId BigInt

  locale Locale

  name String

  slug String

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  tag Tag
    @relation(
      fields: [tagId],
      references: [id]
    )

  @@unique([tagId, locale])
}
```

---

## PostTag

```prisma
model PostTag {
  postId BigInt
  tagId BigInt

  post Post
    @relation(fields: [postId], references: [id])

  tag Tag
    @relation(fields: [tagId], references: [id])

  @@id([postId, tagId])
}
```

---

## Media

```prisma
model Media {
  id BigInt @id @default(autoincrement())

  publicId String

  url String

  mimeType String

  width Int?

  height Int?

  fileSize BigInt?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## AiGenerationLog

```prisma
model AiGenerationLog {
  id BigInt @id @default(autoincrement())

  postId BigInt

  type AiGenerationType

  status AiGenerationStatus

  prompt String @db.LongText

  response String @db.LongText

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  post Post
    @relation(fields: [postId], references: [id])
}
```

---

## SiteSetting

```prisma
model SiteSetting {
  id BigInt @id @default(autoincrement())

  siteName String

  siteDescription String @db.Text

  profileImage String?

  githubUrl String?

  xUrl String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```
