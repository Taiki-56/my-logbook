import { Link } from "@/i18n/navigation";
import type { AdminDisplayPost } from "@/types/post";
import { Languages } from "lucide-react";
import { getTranslations } from "next-intl/server";
import StatusBadge from "./StatusBadge";

type Props = {
  posts: AdminDisplayPost[];
};

const PostTable = async ({ posts }: Props) => {
  const t = await getTranslations("Admin.posts.postTable");
  return (
    <div className="p-8">
      <div className="border border-[#c1c6d7] rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#fbf9f8] border-b border-[#c1c6d7] font-['Geist:Medium'] font-medium text-[11px] text-[#414754] tracking-[0.88px] uppercase">
          <div className="col-span-4">{t("title")}</div>
          <div className="col-span-3">{t("languageStatus")}</div>
          <div className="col-span-2">{t("updatedAt")}</div>
          <div className="col-span-3 text-right">{t("actions")}</div>
        </div>

        <div className="divide-y divide-[#c1c6d7]">
          {posts.map((post) => (
            <div
              key={post.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#fbf9f8] transition-colors">
              <div className="col-span-4">
                <span className="font-['Geist:Medium'] font-medium text-[14px] text-[#1b1c1c] line-clamp-2">
                  {post.title}
                </span>
              </div>

              <div className="col-span-3 flex flex-wrap gap-2">
                <StatusBadge
                  lang="JA"
                  statusObj={post.statuses.ja}
                />
                <StatusBadge
                  lang="EN"
                  statusObj={post.statuses.en}
                />
                <StatusBadge
                  lang="FR"
                  statusObj={post.statuses.fr}
                />
                <StatusBadge
                  lang="ES"
                  statusObj={post.statuses.es}
                />
              </div>

              <div className="col-span-2 font-['Geist:Regular'] text-[13px] text-[#999]">{post.updatedAt}</div>

              <div className="col-span-3 flex items-center justify-end gap-2">
                {!post.statuses.en && post.statuses.ja && (
                  <Link
                    href={`/admin/posts/new?postId=${post.id}&targetLang=en`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#eef4ff] text-[#0058c3] hover:bg-[#d8e2ff] rounded-md transition-colors text-[12px] font-medium border border-[#c6d7ff]">
                    <Languages className="w-3.5 h-3.5" />
                    {t("translateTo", { lang: "EN" })}
                  </Link>
                )}
                {!post.statuses.fr && post.statuses.ja && (
                  <Link
                    href={`/admin/posts/new?postId=${post.id}&targetLang=fr`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fff1f2] text-[#be123c] hover:bg-[#ffe4e6] rounded-md transition-colors text-[12px] font-medium border border-[#fecdd3]">
                    <Languages className="w-3.5 h-3.5" />
                    {t("translateTo", { lang: "FR" })}
                  </Link>
                )}
                {!post.statuses.es && post.statuses.ja && (
                  <Link
                    href={`/admin/posts/new?postId=${post.id}&targetLang=es`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fff7ed] text-[#c2410c] hover:bg-[#ffedd5] rounded-md transition-colors text-[12px] font-medium border border-[#fed7aa]">
                    <Languages className="w-3.5 h-3.5" />
                    {t("translateTo", { lang: "ES" })}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostTable;
