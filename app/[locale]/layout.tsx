import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

import { isValidLocale } from "@/types/config";
import { getTranslations } from "next-intl/server";
import "./globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async (props: Omit<Props, "children">): Promise<Metadata> => {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: {
      template: "%s | MyLogbook",
      default: "MyLogbook"
    },
    description: t("defaultDescription"),
    icons: {
      icon: "/favicon.ico"
    }
  };
};

const RootLayout = async (props: Props) => {
  const { locale } = await props.params;
  if (!isValidLocale(locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>{props.children}</NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
