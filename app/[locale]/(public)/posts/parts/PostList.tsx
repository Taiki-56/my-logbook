import { DisplayPost } from "@/types/post";
import EmptyState from "./EmptyState";
import Pagination from "./Pagination";
import PostCard from "./PostCard";

type Props = {
  posts: DisplayPost[];
  currentPage: number;
  totalPages: number;
};

/** Renders the paginated post grid/list on the posts list page, or an empty state when there are no results. */
const PostList = ({ posts, currentPage, totalPages }: Props) => {
  if (posts.length === 0) {
    return (
      <div className="w-full pt-8 lg:pt-12">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="w-full pt-6 lg:pt-12">
      {/* Desktop */}
      <div className="hidden lg:grid grid-cols-2 gap-8">
        {posts.map((post) => (
          <PostCard
            key={`desktop-${post.id}`}
            post={post}
            layout="grid"
          />
        ))}
      </div>
      {/* Mobile Layout */}
      <div className="flex flex-col gap-6 lg:hidden">
        {posts.map((post) => (
          <PostCard
            key={`mobile-${post.id}`}
            post={post}
            layout="horizontal"
          />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="w-full pt-10 lg:pt-16">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default PostList;
