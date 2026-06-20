import SearchBar from "@/components/SearchBar";
import Title from "./Title";

const Head = () => {
  return (
    <div className="max-w-170 mx-auto flex flex-col gap-0 pt-8">
      <Title />
      <SearchBar />
    </div>
  );
};

export default Head;
