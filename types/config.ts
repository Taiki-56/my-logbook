// type Locale = "ja" | "en" | "fr";

// export type { Locale };

// 1. サポートする言語を「配列」として定義（as const が重要！）
export const routingLocales = ["ja", "en", "fr"] as const;

// 2. 配列から型を自動生成 ("ja" | "en" | "fr" になる)
export type Locale = (typeof routingLocales)[number];

// 3. 安全装置（型ガード関数）を作る
export const isValidLocale = (locale: string): locale is Locale => {
  return routingLocales.includes(locale as Locale);
};
