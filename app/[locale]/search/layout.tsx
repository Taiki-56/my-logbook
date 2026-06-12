import Footer from "@/components/Footer";
import Header from "@/components/Header";

const SearchLayout = async (children: React.ReactNode) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default SearchLayout;
