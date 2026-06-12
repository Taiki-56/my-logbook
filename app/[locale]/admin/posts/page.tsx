"use client";

import AdminSidebar from "@/components/AdminSidebar";
import { Link } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight, MoreVertical, Plus, Search } from "lucide-react";
import { useTranslations } from "next-intl";

export default function PostsPage() {
  const t = useTranslations("Admin.posts");

  // Mock data
  const posts = [
    {
      id: "1",
      title: "Building Modern Web Applications with Next.js 14",
      author: "Sarah Chen",
      status: "published",
      updatedAt: "2024-01-15 14:30"
    },
    {
      id: "3",
      title: "Advanced TypeScript Patterns for Enterprise Apps",
      author: "Alex Rivera",
      status: "draft",
      updatedAt: "2024-01-14 09:15"
    },
    {
      id: "4",
      title: "Docker Best Practices in 2024",
      author: "Mike Johnson",
      status: "published",
      updatedAt: "2024-01-13 16:45"
    },
    {
      id: "5",
      title: "Understanding React Server Components",
      author: "Emma Wilson",
      status: "draft",
      updatedAt: "2024-01-12 11:20"
    },
    {
      id: "6",
      title: "GraphQL vs REST: Making the Right Choice",
      author: "David Lee",
      status: "archived",
      updatedAt: "2024-01-10 13:00"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-700";
      case "draft":
        return "bg-yellow-100 text-yellow-700";
      case "archived":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "published":
        return t("statusPublished");
      case "draft":
        return t("statusDraft");
      case "archived":
        return t("statusArchived");
      default:
        return status;
    }
  };

  return (
    <AdminSidebar>
      <div className="min-h-screen bg-white">
        {/* Header */}
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

          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#414754]" />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                className="w-full h-11 pl-10 pr-4 border border-[#c1c6d7] rounded-lg font-['Geist:Regular'] text-[14px] focus:outline-none focus:border-[#0058c3]"
              />
            </div>

            {/* Status Filter */}
            <select className="h-11 px-4 border border-[#c1c6d7] rounded-lg font-['Geist:Regular'] text-[14px] text-[#414754] focus:outline-none focus:border-[#0058c3] bg-white">
              <option>{t("allStatuses")}</option>
              <option>{t("statusPublished")}</option>
              <option>{t("statusDraft")}</option>
              <option>{t("statusArchived")}</option>
            </select>

            {/* Category Filter */}
            <select className="h-11 px-4 border border-[#c1c6d7] rounded-lg font-['Geist:Regular'] text-[14px] text-[#414754] focus:outline-none focus:border-[#0058c3] bg-white">
              <option>{t("allCategories")}</option>
              <option>Technology</option>
              <option>Tutorial</option>
              <option>Opinion</option>
            </select>
          </div>
        </header>

        {/* Table */}
        <div className="p-8">
          <div className="border border-[#c1c6d7] rounded-xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#fbf9f8] border-b border-[#c1c6d7] font-['Geist:Medium'] font-medium text-[11px] text-[#414754] tracking-[0.88px]">
              <div className="col-span-5">{t("tableTitle")}</div>
              <div className="col-span-2">{t("tableAuthor")}</div>
              <div className="col-span-2">{t("tableStatus")}</div>
              <div className="col-span-2">{t("tableUpdatedAt")}</div>
              <div className="col-span-1 text-right">{t("tableActions")}</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-[#c1c6d7]">
              {posts.map((post, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#fbf9f8] transition-colors">
                  <div className="col-span-5">
                    <Link
                      href={`/admin/posts/edit/${post.id}`}
                      className="font-['Geist:Medium'] font-medium text-[14px] text-[#1b1c1c] hover:text-[#0058c3] transition-colors">
                      {post.title}
                    </Link>
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <div className="w-6 h-6 bg-[#c1c6d7] rounded-full flex items-center justify-center text-[10px] text-white font-medium">
                      {post.author.charAt(0)}
                    </div>
                    <span className="font-['Geist:Regular'] text-[13px] text-[#414754]">{post.author}</span>
                  </div>
                  <div className="col-span-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full font-['Geist:Medium'] text-[11px] ${getStatusColor(post.status)}`}>
                      {getStatusText(post.status)}
                    </span>
                  </div>
                  <div className="col-span-2 font-['Geist:Regular'] text-[13px] text-[#999]">{post.updatedAt}</div>
                  <div className="col-span-1 flex justify-end">
                    <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#e2e2e2] transition-colors">
                      <MoreVertical className="w-4 h-4 text-[#414754]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="font-['Geist:Regular'] text-[13px] text-[#414754]">
              {t("showing")} 1 {t("to")} 5 {t("of")} 24 {t("entries")}
            </div>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 flex items-center justify-center border border-[#c1c6d7] rounded-md hover:bg-[#fbf9f8] transition-colors">
                <ChevronLeft className="w-4 h-4 text-[#414754]" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center border border-[#c1c6d7] bg-[#1b1c1c] text-white rounded-md font-['Geist:Medium'] text-[13px]">
                1
              </button>
              <button className="w-9 h-9 flex items-center justify-center border border-[#c1c6d7] rounded-md hover:bg-[#fbf9f8] transition-colors font-['Geist:Regular'] text-[13px] text-[#414754]">
                2
              </button>
              <button className="w-9 h-9 flex items-center justify-center border border-[#c1c6d7] rounded-md hover:bg-[#fbf9f8] transition-colors font-['Geist:Regular'] text-[13px] text-[#414754]">
                3
              </button>
              <button className="w-9 h-9 flex items-center justify-center border border-[#c1c6d7] rounded-md hover:bg-[#fbf9f8] transition-colors">
                <ChevronRight className="w-4 h-4 text-[#414754]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminSidebar>
  );
}
