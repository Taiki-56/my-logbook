/**
 * Dashboard statistics service.
 *
 * Aggregates user activity, post counts, translation rates, and category
 * distributions for the admin dashboard overview.
 */

import prisma from "@/libs/prisma";

// * Retrieves and calculates dashboard statistics for a specific author.
const getDashboardStats = async (authorId: string) => {
  const totalPostsCount = await prisma.post.count({ where: { authorId } });

  const draftPostsCount = await prisma.postContent.count({
    where: {
      status: "DRAFT",
      post: { authorId }
    }
  });

  const user = await prisma.user.findUnique({
    where: { id: authorId },
    select: { currentStreak: true }
  });

  const currentStreak = user?.currentStreak || 0;

  const jaPostsCount = await prisma.postContent.count({ where: { locale: "ja", post: { authorId } } });
  const translatedContentsCount = await prisma.postContent.count({
    where: { locale: { not: "ja" }, post: { authorId } }
  });
  const translationRate = jaPostsCount > 0 ? Math.round((translatedContentsCount / (jaPostsCount * 2)) * 100) : 0;

  const recentContents = await prisma.postContent.findMany({
    where: { post: { authorId } },
    orderBy: { updatedAt: "desc" },
    take: 5,
    include: {
      post: true
    }
  });

  const recentActivity = recentContents.map((content) => {
    const diffHours = Math.max(1, Math.floor((Date.now() - new Date(content.updatedAt).getTime()) / (1000 * 60 * 60)));
    const timeAgo = diffHours > 24 ? `${Math.floor(diffHours / 24)} days ago` : `${diffHours} hours ago`;

    return {
      title: content.title,
      category: content.post.category,
      lang: content.locale.toUpperCase(),
      slug: content.slug,
      status: content.status === "PUBLISHED" ? "Published" : "Draft",
      time: timeAgo
    };
  });

  const categoryGroups = await prisma.post.groupBy({
    by: ["category"],
    where: { authorId },
    _count: { category: true }
  });

  const totalCategoryPosts = totalPostsCount || 1;
  const categoryColors: Record<string, string> = {
    TECH: "bg-[#0058c3]",
    FITNESS: "bg-[#1b1c1c]",
    FOOD: "bg-[#e5a00d]",
    TRAVEL: "bg-[#10b981]",
    WORK: "bg-[#8b5cf6]",
    LIFE: "bg-[#ec4899]"
  };

  const categories = categoryGroups.map((group) => ({
    name: group.category,
    percentage: Math.round((group._count.category / totalCategoryPosts) * 100),
    color: categoryColors[group.category] || "bg-[#0058c3]"
  }));

  return {
    totalPosts: totalPostsCount.toString(),
    draftPosts: draftPostsCount.toString(),
    translationRate: `${Math.min(100, Math.max(translationRate, 0))}%`,
    // * Returns the streak count as a raw number (e.g., 0, 1, 5...)
    currentStreak,
    recentActivity,
    categories,
    needsTranslationCount: jaPostsCount - Math.floor(translatedContentsCount / 2)
  };
};

export { getDashboardStats };
