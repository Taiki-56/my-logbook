/**
 * Application configuration types.
 *
 * Defines supported routing locales and provides type guards for locale validation.
 */

// * Defines the supported languages for the multilingual blog
const routingLocales = ["ja", "en", "fr", "es"] as const;

// * Represents a valid locale string based on routingLocales
type Locale = (typeof routingLocales)[number];

// * Type guard to check if a given string is a valid Locale
const isValidLocale = (locale: string): locale is Locale => {
  return routingLocales.includes(locale as Locale);
};

export { isValidLocale, routingLocales, type Locale };
