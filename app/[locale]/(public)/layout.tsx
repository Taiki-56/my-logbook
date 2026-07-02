import Footer from "@/components/public/Footer";
import Header from "@/components/public/Header";

type Props = {
  children: React.ReactNode;
};

const PublicLayout = async ({ children }: Props) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default PublicLayout;
