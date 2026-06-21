import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("Home.title");
  return <h1>{t("title")}</h1>;
};

export default Page;
