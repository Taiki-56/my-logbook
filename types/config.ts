//* Add your prefered langs as you want
const routingLocales = ["ja", "en", "fr", "es"] as const;

type Locale = (typeof routingLocales)[number];

const isValidLocale = (locale: string): locale is Locale => {
  return routingLocales.includes(locale as Locale);
};

export { isValidLocale, routingLocales, type Locale };
