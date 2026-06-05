# Screen Flow

## Public Site

```text
TOP
(/[locale])

├─ プロフィール
│  (/[locale]/about)
│
├─ 記事一覧
│  (/[locale]/posts)
│
│   └─ 記事詳細
│      (/[locale]/posts/[slug])
│
├─ 記事検索
│  (/[locale]/search)
│
│   └─ 記事詳細
│      (/[locale]/posts/[slug])
│
├─ タグ一覧
│  (/[locale]/tags)
│
│   └─ タグ詳細
│      (/[locale]/tags/[slug])
│
│         └─ 記事詳細
│            (/[locale]/posts/[slug])
│
└─ 最新記事
    (TOP表示)

      └─ 記事詳細
         (/[locale]/posts/[slug])
```

---

## Admin Site

```text
ログイン
(/admin/login)

│
▼

ダッシュボード
(/admin)

├─ 記事管理
│  (/admin/posts)
│
│   ├─ 下書き
│   │  (/admin/posts?status=DRAFT)
│   │
│   ├─ 公開
│   │  (/admin/posts?status=PUBLISHED)
│   │
│   └─ 非公開
│      (/admin/posts?status=PRIVATE)
│
│
├─ 新規記事作成
│  (/admin/posts/new)
│
│   ▼
│
│  記事編集
│  (/admin/posts/[id])
│
│   ├─ 保存
│   ├─ 公開
│   ├─ 非公開
│   ├─ 削除
│   │
│   ├─ AI翻訳
│   │
│   ├─ AIタグ生成
│   │
│   ├─ AI SEO生成
│   │
│   └─ 関連記事Embedding生成
│
│
├─ メディア管理
│  (/admin/media)
│
│
└─ サイト設定
   (/admin/settings)
```

---

# URL Structure

## Public

```text
/[locale]

/[locale]/about

/[locale]/posts

/[locale]/posts/[slug]

/[locale]/search

/[locale]/tags

/[locale]/tags/[slug]
```

---

## Admin

```text
/admin/login

/admin

/admin/posts

/admin/posts/new

/admin/posts/[id]

/admin/media

/admin/settings
```

---

# Locale

```text
ja
en
fr
```

---

# Post Status

```text
DRAFT

PUBLISHED

PRIVATE
```

---

# AI Features

記事編集画面から実行

```text
AI翻訳

日本語
↓
英語生成
↓
フランス語生成

AIタグ生成

AI SEO生成

Embedding生成

関連記事推薦
```
