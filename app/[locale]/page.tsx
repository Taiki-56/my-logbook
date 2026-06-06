import { useTranslations } from "next-intl";

const Home = () => {
  const t = useTranslations("LandingPage");
  return <h1>{t("title")}</h1>;
};

export default Home;
