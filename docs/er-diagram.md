# ER Diagram

```mermaid
erDiagram

    users {
        BIGINT id PK
        VARCHAR email
        VARCHAR password_hash
        DATETIME created_at
        DATETIME updated_at
    }

    posts {
        BIGINT id PK
        ENUM status
        DATETIME published_at
        DATETIME created_at
        DATETIME updated_at
    }

    post_translations {
        BIGINT id PK
        BIGINT post_id FK
        VARCHAR locale
        VARCHAR title
        VARCHAR slug
        TEXT html
        TEXT css
        TEXT project_data
        VARCHAR seo_title
        TEXT seo_description
        BOOLEAN is_ai_generated
        DATETIME created_at
        DATETIME updated_at
    }

    post_embeddings {
        BIGINT id PK
        BIGINT post_translation_id FK
        VARCHAR locale
        VARCHAR embedding_model
        JSON vector
        DATETIME created_at
        DATETIME updated_at
    }

    tags {
        BIGINT id PK
        DATETIME created_at
        DATETIME updated_at
    }

    tag_translations {
        BIGINT id PK
        BIGINT tag_id FK
        VARCHAR locale
        VARCHAR name
        VARCHAR slug
        DATETIME created_at
        DATETIME updated_at
    }

    post_tags {
        BIGINT post_id
        BIGINT tag_id
    }

    media {
        BIGINT id PK
        VARCHAR public_id
        VARCHAR url
        VARCHAR mime_type
        INT width
        INT height
        BIGINT file_size
        DATETIME created_at
        DATETIME updated_at
    }

    ai_generation_logs {
        BIGINT id PK
        BIGINT post_id FK
        VARCHAR type
        VARCHAR status
        TEXT prompt
        TEXT response
        DATETIME created_at
        DATETIME updated_at
    }

    site_settings {
        BIGINT id PK
        VARCHAR site_name
        TEXT site_description
        VARCHAR profile_image
        VARCHAR github_url
        VARCHAR x_url
        DATETIME created_at
        DATETIME updated_at
    }

    posts ||--o{ post_translations : has_many

    post_translations ||--o{ post_embeddings : has_many

    tags ||--o{ tag_translations : has_many

    posts ||--o{ post_tags : has_many
    tags ||--o{ post_tags : has_many

    posts ||--o{ ai_generation_logs : has_many
```

## Constraints

### post_translations

- UNIQUE(post_id, locale)
- UNIQUE(slug)

### tag_translations

- UNIQUE(tag_id, locale)

### posts.status

- DRAFT
- PUBLISHED
- PRIVATE

### locales

- JA
- EN
- FR

### ai_generation_logs.type

- TRANSLATION
- TAG_GENERATION
- SEO_ANALYSIS
- EMBEDDING_GENERATION

### ai_generation_logs.status

- PENDING
- SUCCESS
- FAILED

```

```
