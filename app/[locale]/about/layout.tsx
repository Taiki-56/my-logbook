import Footer from "@/components/Footer";
import Header from "@/components/Header";

const AboutLayout = async (children: React.ReactNode) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default AboutLayout;
