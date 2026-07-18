import AdminSidebar from "@/components/admin/AdminSidebar";
import { Link } from "@/i18n/navigation";
import { getAdminPosts } from "@/services/post";
import { Languages, MoreVertical, Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";

// ステータスに応じたバッジの色を返すヘルパー
const getStatusColor = (status: string | null) => {
  if (!status) return "bg-gray-50 text-gray-400 border border-gray-200"; // 未作成
  switch (status) {
    case "PUBLISHED":
      return "bg-green-100 text-green-700 border border-green-200";
    case "DRAFT":
      return "bg-yellow-100 text-yellow-700 border border-yellow-200";
    case "PRIVATE":
      return "bg-gray-100 text-gray-700 border border-gray-300";
    default:
      return "bg-gray-100 text-gray-700 border border-gray-300";
  }
};

const Page = async () => {
  const t = await getTranslations("Admin.posts");

  // 🌟 DBから実データを取得
  const posts = await getAdminPosts();

  return (
    <AdminSidebar>
      <div className="min-h-screen bg-white">
        {/* Header (検索バーなどはそのまま残します) */}
        <header className="border-b border-[#c1c6d7] bg-white px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-['Geist:Bold'] font-bold text-[28px] text-[#1b1c1c]">{t("title")}</h1>
            <Link
              href={"/admin/posts/new"}
              className="bg-[#1b1c1c] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-['Geist:Medium'] font-medium text-[14px] hover:bg-[#2a2b2b] transition-colors">
              <Plus className="w-4 h-4" />
              {t("createPost")}
            </Link>
          </div>

          {/* ... (Search and Filters 中略) ... */}
        </header>

        {/* Table */}
        <div className="p-8">
          <div className="border border-[#c1c6d7] rounded-xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#fbf9f8] border-b border-[#c1c6d7] font-['Geist:Medium'] font-medium text-[11px] text-[#414754] tracking-[0.88px]">
              <div className="col-span-4">{t("tableTitle") || "TITLE"}</div>
              <div className="col-span-3">言語 & ステータス</div>
              <div className="col-span-2">{t("tableUpdatedAt") || "UPDATED AT"}</div>
              <div className="col-span-3 text-right">アクション (翻訳)</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-[#c1c6d7]">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#fbf9f8] transition-colors">
                  {/* 1. タイトル (リンクを外してテキストのみ表示) */}
                  <div className="col-span-4">
                    <span className="font-['Geist:Medium'] font-medium text-[14px] text-[#1b1c1c] line-clamp-2">
                      {post.title}
                    </span>
                  </div>

                  {/* 2. 言語とステータスのバッジ (slugがある場合はリンクにする) */}
                  <div className="col-span-3 flex flex-wrap gap-2">
                    {/* 日本語 (JA) */}
                    {post.statuses.ja ? (
                      <Link href={`/admin/posts/edit/${post.statuses.ja.slug}`}>
                        <span
                          className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(post.statuses.ja.status)}`}>
                          JA ({post.statuses.ja.status})
                        </span>
                      </Link>
                    ) : (
                      <span
                        className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold ${getStatusColor(null)}`}>
                        JA (未作成)
                      </span>
                    )}

                    {/* 英語 (EN) */}
                    {post.statuses.en ? (
                      <Link href={`/admin/posts/edit/${post.statuses.en.slug}`}>
                        <span
                          className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(post.statuses.en.status)}`}>
                          EN ({post.statuses.en.status})
                        </span>
                      </Link>
                    ) : (
                      <span
                        className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold ${getStatusColor(null)}`}>
                        EN (未作成)
                      </span>
                    )}

                    {/* フランス語 (FR) */}
                    {post.statuses.fr ? (
                      <Link href={`/admin/posts/edit/${post.statuses.fr.slug}`}>
                        <span
                          className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(post.statuses.fr.status)}`}>
                          FR ({post.statuses.fr.status})
                        </span>
                      </Link>
                    ) : (
                      <span
                        className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold ${getStatusColor(null)}`}>
                        FR (未作成)
                      </span>
                    )}
                  </div>

                  {/* 更新日時 */}
                  <div className="col-span-2 font-['Geist:Regular'] text-[13px] text-[#999]">{post.updatedAt}</div>

                  {/* 3. 翻訳アクションボタン (遷移先を /new に変更し、postId を渡す) */}
                  <div className="col-span-3 flex items-center justify-end gap-2">
                    {/* 英語翻訳ボタン */}
                    {!post.statuses.en && post.statuses.ja && (
                      <Link
                        href={`/admin/posts/new?postId=${post.id}&locale=en&autoTranslate=true`}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#eef4ff] text-[#0058c3] hover:bg-[#d8e2ff] rounded-md transition-colors text-[12px] font-medium border border-[#c6d7ff]">
                        <Languages className="w-3.5 h-3.5" />
                        ENへ翻訳
                      </Link>
                    )}

                    {/* フランス語翻訳ボタン */}
                    {!post.statuses.fr && post.statuses.ja && (
                      <Link
                        href={`/admin/posts/new?postId=${post.id}&locale=fr&autoTranslate=true`}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fcf0f0] text-[#c30000] hover:bg-[#f9dada] rounded-md transition-colors text-[12px] font-medium border border-[#ffc6c6]">
                        <Languages className="w-3.5 h-3.5" />
                        FRへ翻訳
                      </Link>
                    )}

                    {/* 右端のドットメニュー（今回は一覧から直接親要素を編集する画面がないため、非表示または削除しても良いかもしれません。残す場合は親Postのメタデータ編集モーダルなどを開く用途になります） */}
                    <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#e2e2e2] transition-colors">
                      <MoreVertical className="w-4 h-4 text-[#414754]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminSidebar>
  );
};

export default Page;
