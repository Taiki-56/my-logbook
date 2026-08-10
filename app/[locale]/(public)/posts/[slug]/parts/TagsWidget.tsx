import { Link } from "@/i18n/navigation";
import { PostWithRelations } from "@/types/post";

type Props = {
  postTags: PostWithRelations["postTags"];
};

const TagsWidget = ({ postTags }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#e4e2e2] p-5 lg:p-7">
      <h3 className="font-['JetBrains_Mono'] font-bold text-[13px] tracking-widest uppercase text-[#414754] mb-5 border-b border-gray-100 pb-2.5 flex items-center gap-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
          <line
            x1="7"
            y1="7"
            x2="7.01"
            y2="7"></line>
        </svg>
        Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {postTags.map((pt) => {
          const tagContent = pt.tag.contents?.[0];
          const tagName = tagContent?.name || decodeURIComponent(pt.tag.slug);

          return (
            <Link
              href={`/posts?tag=${pt.tag.slug}`}
              key={pt.tagId}
              className="bg-[#f5f3f3] hover:bg-[#e4e2e2] transition-colors border border-[#c1c6d7] text-[#414754] px-2.5 pt-1 pb-1.5 rounded text-[12.5px] font-medium cursor-pointer flex items-center">
              <span className="text-[#0058c3] mr-1">#</span> {tagName}
            </Link>
          );
        })}
        {postTags.length === 0 && <span className="text-sm text-gray-400">タグがありません</span>}
      </div>
    </div>
  );
};

export default TagsWidget;
