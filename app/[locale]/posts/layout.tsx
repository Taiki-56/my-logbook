import Footer from "@/components/Footer";
import Header from "@/components/Header";

const PostsLayout = async (children: React.ReactNode) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default PostsLayout;
