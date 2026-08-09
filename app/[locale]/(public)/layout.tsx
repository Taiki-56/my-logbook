import Footer from "@/components/public/Footer";
import Header from "@/components/public/Header";

type Props = {
  children: React.ReactNode;
};

const PublicLayout = async ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
