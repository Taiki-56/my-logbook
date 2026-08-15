import SearchBar from "@/components/public/SearchBar";
import Title from "./Title";

/** Home page header combining the title and the search bar. */
const Head = () => {
  return (
    <div className="max-w-170 mx-auto flex flex-col gap-0 pt-8">
      <Title />
      <SearchBar />
    </div>
  );
};

export default Head;
