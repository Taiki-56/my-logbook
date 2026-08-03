import "dotenv/config";

import bcrypt from "bcrypt";
import prisma from "../lib/prisma";

const projectDataTech = {
  type: "doc",
  content: [
    {
      type: "blockquote",
      content: [
        {
          type: "paragraph",
          content: [
            {
              text: "デスクワーク中心のエンジニアにとって、筋トレは最高のライフハックです。週3回のジム通いで集中力とスタミナが劇的に向上します。",
              type: "text"
            }
          ]
        }
      ]
    },
    { type: "heading", content: [{ text: "なぜエンジニアに筋トレが必要なのか？", type: "text" }] },
    {
      type: "paragraph",
      content: [
        {
          text: "長時間のPC作業は、慢性的な運動不足、肩こり、腰痛を引き起こします。私自身、過去の腰痛をきっかけに本格的なボディメイクを始めました。",
          type: "text"
        }
      ]
    },
    { type: "heading", content: [{ text: "主な効果", type: "text" }] },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [{ type: "paragraph", content: [{ text: "血流改善による疲労感の軽減", type: "text" }] }]
        },
        {
          type: "listItem",
          content: [{ type: "paragraph", content: [{ text: "集中力の持続時間の延長", type: "text" }] }]
        },
        {
          type: "listItem",
          content: [{ type: "paragraph", content: [{ text: "メンタルの安定とストレス耐性の向上", type: "text" }] }]
        }
      ]
    },
    { type: "heading", content: [{ text: "まとめ", type: "text" }] },
    {
      type: "paragraph",
      content: [
        {
          text: "体を動かすことは最高の気分転換になります。健康な体こそが、最高の開発パフォーマンスを生み出します。",
          type: "text"
        }
      ]
    },
    { type: "paragraph" }
  ]
};

const projectDataFitness = {
  type: "doc",
  content: [
    {
      type: "blockquote",
      content: [
        {
          type: "paragraph",
          content: [
            {
              text: "💡 要約：デスクワーク中心のエンジニアにとって、筋トレは最高のハック。週3回のジム通いで、集中力と体力が劇的に向上します。",
              type: "text"
            }
          ]
        }
      ]
    },
    { type: "paragraph" },
    { type: "heading", content: [{ text: "なぜエンジニアに筋トレが必要なのか？", type: "text" }] },
    {
      type: "paragraph",
      content: [
        {
          text: "長時間PCに向かう仕事柄、私たちは慢性的な運動不足や肩こり、腰痛に悩まされがちです。私自身、過去に腰を痛めてから本格的にボディメイクを始めました。",
          type: "text"
        }
      ]
    },
    { type: "paragraph" },
    { type: "heading", content: [{ text: "主なメリット", type: "text" }] },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [{ type: "paragraph", content: [{ text: "血流改善による脳のパフォーマンス向上", type: "text" }] }]
        },
        {
          type: "listItem",
          content: [{ type: "paragraph", content: [{ text: "テストステロン分泌によるメンタルの安定", type: "text" }] }]
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ text: "睡眠の質が改善し、翌日のコーディング集中力がアップ", type: "text" }]
            }
          ]
        }
      ]
    },
    { type: "paragraph" },
    { type: "heading", content: [{ text: "私の1週間のルーティン", type: "text" }] },
    {
      type: "paragraph",
      content: [
        { text: "現在は週に3回、仕事前の朝の時間を活用してジムに通っています。最初は「", type: "text" },
        { text: "忙しくて時間がない", type: "text", marks: [{ type: "bold" }] },
        { text: "」と思っていましたが、習慣化してしまえばこれほど", type: "text" },
        { text: "投資対効果の高いアクティビティ", type: "text", marks: [{ type: "highlight" }] },
        { text: "はありません。ぜひ、今日から少しずつ体を動かしてみてください！", type: "text" }
      ]
    },
    { type: "paragraph" },
    { type: "paragraph" }
  ]
};

const projectDataFood = {
  type: "doc",
  content: [
    { type: "heading", content: [{ text: "週末のラーメン巡り", type: "text" }] },
    {
      type: "paragraph",
      content: [{ text: "開発の疲れを癒やす最高の一杯を探して、都内の名店を巡っています。", type: "text" }]
    }
  ]
};

const projectDataWork = {
  type: "doc",
  content: [
    { type: "heading", content: [{ text: "モダンなチーム開発のあり方", type: "text" }] },
    {
      type: "paragraph",
      content: [
        {
          text: "非同期コミュニケーションを前提としたフルリモート環境での、生産性向上の工夫についてまとめました。",
          type: "text"
        }
      ]
    }
  ]
};

const projectDataTravel = {
  type: "doc",
  content: [
    { type: "heading", content: [{ text: "ワーケーションという選択肢", type: "text" }] },
    {
      type: "paragraph",
      content: [{ text: "場所にとらわれない働き方を実践するため、1週間の地方滞在を試してみた記録です。", type: "text" }]
    }
  ]
};

const projectDataLife = {
  type: "doc",
  content: [
    { type: "heading", content: [{ text: "デジタルデトックスの実践", type: "text" }] },
    {
      type: "paragraph",
      content: [
        {
          text: "週末の数時間だけデバイスを手放すことで、驚くほど頭がクリアになり、月曜からのパフォーマンスが向上します。",
          type: "text"
        }
      ]
    }
  ]
};

const main = async () => {
  console.log("🧹 Cleaning up existing data...");

  // 外部キー制約（リレーション）のエラーを防ぐため、子テーブルから順番に削除します
  await prisma.postContent.deleteMany();
  await prisma.postTag.deleteMany();
  await prisma.post.deleteMany();

  // 🌟 TagContent の削除コメントアウトを解除しました
  await prisma.tagContent.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();

  console.log("✨ Database cleared!");

  const email = process.env.ADMIN_EMAIL!;
  const password = process.env.ADMIN_PASSWORD!;
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: {
      email
    },
    update: {
      passwordHash
    },
    create: {
      email,
      passwordHash
    }
  });
  console.log("Created user:", user);

  console.log("Seeding tags...");

  // 🌟 子タグ(TagContent)の生成から `slug` を削除しました
  const techTag = await prisma.tag.create({
    data: {
      slug: "nextjs",
      contents: {
        create: [{ locale: "ja", name: "Next.js" }]
      }
    }
  });

  const foodTag = await prisma.tag.create({
    data: {
      slug: "ramen",
      contents: {
        create: [{ locale: "ja", name: "ラーメン" }]
      }
    }
  });

  const fitnessTag = await prisma.tag.create({
    data: {
      slug: "workout",
      contents: {
        create: [{ locale: "ja", name: "筋トレ" }]
      }
    }
  });

  const workTag = await prisma.tag.create({
    data: {
      slug: "career",
      contents: {
        create: [{ locale: "ja", name: "キャリア" }]
      }
    }
  });

  const travelTag = await prisma.tag.create({
    data: {
      slug: "trip",
      contents: {
        create: [{ locale: "ja", name: "旅行" }]
      }
    }
  });

  const lifeTag = await prisma.tag.create({
    data: {
      slug: "minimalism",
      contents: {
        create: [{ locale: "ja", name: "ミニマリズム" }]
      }
    }
  });

  console.log("Seeding posts...");

  // TECH カテゴリー (Featured 1)
  await prisma.post.create({
    data: {
      authorId: user.id,
      category: "TECH",
      thumbnail: null,
      contents: {
        create: {
          locale: "ja",
          title: "エンジニアのパフォーマンスを最大化する習慣",
          slug: "engineer-performance-habits",
          status: "PUBLISHED",
          seoTitle: "エンジニアの生産性を上げるライフハック",
          seoDescription: "デスクワーク中心のエンジニアにとって、筋トレは最高のライフハックです。",
          html: "<p>本文はprojectDataのエディタで管理しています。</p>",
          projectData: projectDataTech,
          isFeatured: true
        }
      },
      postTags: {
        create: [{ tagId: techTag.id }]
      }
    }
  });

  // FOOD カテゴリー (Featured にはしない)
  await prisma.post.create({
    data: {
      authorId: user.id,
      category: "FOOD",
      thumbnail: null,
      contents: {
        create: {
          locale: "ja",
          title: "東京で絶対に食べるべき絶品ラーメン店5選",
          slug: "tokyo-best-ramen-top-5",
          status: "PUBLISHED",
          seoTitle: "東京の絶品ラーメン トップ5",
          seoDescription: "ラーメン激戦区の東京で、本当におすすめしたい名店を5つ厳選してご紹介します。",
          html: "<p>本文はprojectDataのエディタで管理しています。</p>",
          projectData: projectDataFood,
          isFeatured: false
        }
      },
      postTags: {
        create: [{ tagId: foodTag.id }]
      }
    }
  });

  // FITNESS カテゴリー (Featured 2)
  await prisma.post.create({
    data: {
      authorId: user.id,
      category: "FITNESS",
      thumbnail: null,
      contents: {
        create: {
          locale: "ja",
          title: "初心者向け！自宅でできる効果的な自重トレーニングメニュー",
          slug: "home-workout-for-beginners-guide",
          status: "PUBLISHED",
          seoTitle: "自宅で簡単！初心者向け筋トレ",
          seoDescription: "特別な器具がなくても大丈夫。自宅の省スペースで今日から始められるメニューです。",
          html: "<p>本文はprojectDataのエディタで管理しています。</p>",
          projectData: projectDataFitness,
          isFeatured: true
        }
      },
      postTags: {
        create: [{ tagId: fitnessTag.id }]
      }
    }
  });

  // WORK カテゴリー (Featured 3)
  await prisma.post.create({
    data: {
      authorId: user.id,
      category: "WORK",
      thumbnail: null,
      contents: {
        create: {
          locale: "ja",
          title: "非同期コミュニケーションで劇的に変わるチームの生産性",
          slug: "async-communication-productivity",
          status: "PUBLISHED",
          seoTitle: "非同期コミュニケーションのメリット",
          seoDescription: "リモートワーク時代において、同期的な会議を減らし生産性を高めるためのアプローチ。",
          html: "<p>本文はprojectDataのエディタで管理しています。</p>",
          projectData: projectDataWork,
          isFeatured: true
        }
      },
      postTags: {
        create: [{ tagId: workTag.id }]
      }
    }
  });

  // TRAVEL カテゴリー (Featured 4)
  await prisma.post.create({
    data: {
      authorId: user.id,
      category: "TRAVEL",
      thumbnail: null,
      contents: {
        create: {
          locale: "ja",
          title: "PC1台で旅に出る：1週間のワーケーション実践記",
          slug: "one-week-workation-experience",
          status: "PUBLISHED",
          seoTitle: "ワーケーションのリアルな体験談",
          seoDescription: "新しい環境に身を置くことで得られるインスピレーションと、旅先での仕事術について。",
          html: "<p>本文はprojectDataのエディタで管理しています。</p>",
          projectData: projectDataTravel,
          isFeatured: true
        }
      },
      postTags: {
        create: [{ tagId: travelTag.id }]
      }
    }
  });

  // LIFE カテゴリー (Featured 5)
  await prisma.post.create({
    data: {
      authorId: user.id,
      category: "LIFE",
      thumbnail: null,
      contents: {
        create: {
          locale: "ja",
          title: "週末のデジタルデトックスがもたらす圧倒的なクリア感",
          slug: "weekend-digital-detox",
          status: "PUBLISHED",
          seoTitle: "デジタルデトックスの効果と実践方法",
          seoDescription: "情報過多の現代において、意図的にオフラインの時間を作ることで得られるメリット。",
          html: "<p>本文はprojectDataのエディタで管理しています。</p>",
          projectData: projectDataLife,
          isFeatured: true
        }
      },
      postTags: {
        create: [{ tagId: lifeTag.id }]
      }
    }
  });

  console.log("Seeding finished successfully!");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
