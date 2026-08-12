import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

type StatusBadgeProps = {
  lang: string;
  statusObj?: { slug: string; status: string } | null;
};

type StatusTranslationKey = "published" | "draft" | "uncreated";

/** Maps a raw post status to its i18n translation key for the status badge. */
const getStatusTranslationKey = (status: string): StatusTranslationKey => {
  if (status === "PUBLISHED") return "published";
  if (status === "DRAFT") return "draft";
  return "uncreated";
};

/** Maps a post status to the badge's background/text/border color classes. */
const getStatusColor = (status: string | null) => {
  if (!status) return "bg-gray-50 text-gray-400 border border-gray-200";
  switch (status) {
    case "PUBLISHED":
      return "bg-green-100 text-green-700 border border-green-200";
    case "DRAFT":
      return "bg-yellow-100 text-yellow-700 border border-yellow-200";
    default:
      return "bg-gray-100 text-gray-700 border border-gray-300";
  }
};

/** Per-locale status badge shown in the admin post table; links to the edit page if the locale exists. */
const StatusBadge = async ({ lang, statusObj }: StatusBadgeProps) => {
  const t = await getTranslations("Admin.posts.statusBadge");

  if (statusObj) {
    const statusKey = getStatusTranslationKey(statusObj.status);

    return (
      <Link
        href={`/admin/posts/edit/${statusObj.slug}`}
        className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(
          statusObj.status
        )}`}>
        {lang} ({t(statusKey)})
      </Link>
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold ${getStatusColor(
        null
      )}`}>
      {lang} ({t("uncreated")})
    </span>
  );
};

export default StatusBadge;
