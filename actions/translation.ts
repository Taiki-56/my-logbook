"use server";

import { getSourcePost } from "@/services/post";
import { translatePost, translateTags } from "@/services/translation";
import { Locale } from "@/types/config";
import { TranslatedPost, TranslatedPostResponse } from "@/types/translation";

const translatePostAction = async (targetLang: Locale, postId: string): Promise<TranslatedPostResponse> => {
  try {
    const sourceLang = "ja";
    const sourcePost = await getSourcePost(postId, sourceLang);

    if (!sourcePost) {
      throw new Error("翻訳元の記事が見つかりませんでした。");
    }

    const existingTags = sourcePost.post.postTags.map((pt) => pt.tag);

    //* PostForm側が `{ name: "tag name" }` の配列を期待しているため、それに合わせた型を準備
    const translatedTags: { name: string }[] = [];
    const missingTagNames: string[] = [];

    //* 1. 既存のタグループ：すでに翻訳済みの言語があれば取得、なければ翻訳キューに入れる
    for (const tag of existingTags) {
      const targetContent = tag.contents.find((c) => c.locale === targetLang);
      if (targetContent) {
        // すでにターゲット言語のタグが存在する場合はそのまま使用
        translatedTags.push({ name: targetContent.name });
      } else {
        // 存在しない場合はソース言語（日本語）の名前を取得して、翻訳対象リストに追加
        const sourceTagContent = tag.contents.find((c) => c.locale === sourceLang);
        if (sourceTagContent) {
          missingTagNames.push(sourceTagContent.name);
        }
      }
    }

    //* 2. 翻訳対象のタグがあれば、AIに一括で翻訳させる
    if (missingTagNames.length > 0) {
      const translatedTagsData = await translateTags(targetLang, missingTagNames);

      for (const translated of translatedTagsData) {
        // ここではDBに保存せず、フォームに表示させるための配列に追加するだけ
        translatedTags.push({ name: translated.translatedName });
      }
    }

    //* 3. 記事本体のデータ準備と翻訳
    const sourceData: TranslatedPost = {
      title: sourcePost.title,
      html: sourcePost.html || "",
      seoTitle: sourcePost.seoTitle,
      seoDescription: sourcePost.seoDescription,
      slug: sourcePost.slug
    };

    const translatedData = await translatePost(targetLang, sourceData);

    const unescapedHtml = translatedData.html
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, "&");

    const thumbnail = sourcePost.post?.thumbnail;

    //* 4. 翻訳済みの記事データと、整理されたタグ一覧を合体させて返す
    return {
      ...translatedData,
      html: unescapedHtml,
      thumbnail,
      tags: translatedTags as any // 型エラー回避。PostForm側で tag.name として適切に展開されます
    };
  } catch (error) {
    console.error("Action Error:", error);
    throw new Error("翻訳処理中にエラーが発生しました。");
  }
};

export { translatePostAction };
