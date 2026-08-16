import { redirect } from "@/i18n/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

const LocaleRootPage = async (props: Props) => {
  const { locale } = await props.params;

  redirect({ href: "/home", locale });
};

export default LocaleRootPage;
