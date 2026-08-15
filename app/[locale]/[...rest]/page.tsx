/**
 * Catch-all route for any unmatched path under [locale]; triggers the not-found page.
 * See app/[locale]/not-found.tsx and components/common/NotFoundPage.tsx.
 */

import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("notFoundTitle"),
    description: t("notFoundDescription"),
    robots: {
      index: false,
      follow: false
    }
  };
};

const CatchAllPage = () => {
  notFound();
};

export default CatchAllPage;
