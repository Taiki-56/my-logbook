import SearchBar from "@/components/SearchBar";
import SearchResults from "./parts/SearchResults";

const Page = () => {
  return (
    <div className="max-w-170 mx-auto px-4 lg:px-6 py-12 lg:py-16">
      <SearchBar />
      <SearchResults />
    </div>
  );
};

export default Page;
