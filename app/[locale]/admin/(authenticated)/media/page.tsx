/**
 * Admin media library page wrapper.
 * Handles server-side metadata generation and renders the client-side media library UI.
 */

import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import MediaLibrary from "./parts/MediaLibrary";

export const generateMetadata = async (props: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("adminMediaTitle"),
    description: t("adminMediaDescription")
  };
};

const Page = () => {
  return <MediaLibrary />;
};

export default Page;
