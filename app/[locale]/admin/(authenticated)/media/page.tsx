"use client";

/**
 * Admin media library page. Currently renders static placeholder media items in a
 * grid or list view; not yet wired to a real media service (see actions/media.ts).
 */

import AdminSidebar from "@/components/admin/AdminSidebar";
import { FileText, Grid3x3, Image as ImageIcon, List, Search, Upload, Video } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function MediaPage() {
  const t = useTranslations("Admin.media");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // * Placeholder data for the media library UI (not yet wired to a backend service)
  const mediaItems = [
    {
      type: "image",
      name: "hero-banner.jpg",
      size: "2.4 MB",
      date: "2024-01-15",
      dimensions: "1920x1080",
      thumbnail: "/placeholder-image.jpg"
    },
    {
      type: "image",
      name: "profile-photo.png",
      size: "856 KB",
      date: "2024-01-14",
      dimensions: "800x800",
      thumbnail: "/placeholder-image.jpg"
    },
    {
      type: "document",
      name: "technical-spec.pdf",
      size: "1.2 MB",
      date: "2024-01-13",
      dimensions: "—",
      thumbnail: null
    },
    {
      type: "image",
      name: "blog-cover.jpg",
      size: "1.8 MB",
      date: "2024-01-12",
      dimensions: "1600x900",
      thumbnail: "/placeholder-image.jpg"
    },
    {
      type: "video",
      name: "demo-video.mp4",
      size: "15.6 MB",
      date: "2024-01-11",
      dimensions: "1920x1080",
      thumbnail: null
    },
    {
      type: "image",
      name: "thumbnail-sm.png",
      size: "420 KB",
      date: "2024-01-10",
      dimensions: "600x400",
      thumbnail: "/placeholder-image.jpg"
    }
  ];

  /** Maps a media item's type to its display icon. */
  const getIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-5 h-5" />;
      case "document":
        return <FileText className="w-5 h-5" />;
      case "video":
        return <Video className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <AdminSidebar>
      <div className="min-h-screen bg-white">
        <header className="border-b border-[#c1c6d7] bg-white px-8 py-6">
          <div className="mb-6">
            <h1 className="font-['Geist:Bold'] font-bold text-[28px] text-[#1b1c1c] mb-2">{t("title")}</h1>
            <p className="font-['Geist:Regular'] text-[14px] text-[#414754]">{t("subtitle")}</p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="flex-1 relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#414754]" />
                <input
                  type="text"
                  placeholder={t("searchPlaceholder") || "Search media..."}
                  className="w-full h-11 pl-10 pr-4 border border-[#c1c6d7] rounded-lg font-['Geist:Regular'] text-[14px] focus:outline-none focus:border-[#0058c3]"
                />
              </div>

              <select className="h-11 px-4 border border-[#c1c6d7] rounded-lg font-['Geist:Regular'] text-[14px] text-[#414754] focus:outline-none focus:border-[#0058c3] bg-white">
                <option>{t("allTypes")}</option>
                <option>{t("images")}</option>
                <option>{t("documents")}</option>
                <option>{t("video")}</option>
              </select>

              <select className="h-11 px-4 border border-[#c1c6d7] rounded-lg font-['Geist:Regular'] text-[14px] text-[#414754] focus:outline-none focus:border-[#0058c3] bg-white">
                <option>
                  {t("sortBy")} {t("dateAddedNewest")}
                </option>
                <option>Date Added (Oldest)</option>
                <option>Name (A-Z)</option>
                <option>Name (Z-A)</option>
                <option>Size (Largest)</option>
                <option>Size (Smallest)</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex border border-[#c1c6d7] rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`w-11 h-11 flex items-center justify-center transition-colors ${
                    viewMode === "grid" ? "bg-[#1b1c1c] text-white" : "bg-white text-[#414754] hover:bg-[#fbf9f8]"
                  }`}>
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`w-11 h-11 flex items-center justify-center border-l border-[#c1c6d7] transition-colors ${
                    viewMode === "list" ? "bg-[#1b1c1c] text-white" : "bg-white text-[#414754] hover:bg-[#fbf9f8]"
                  }`}>
                  <List className="w-4 h-4" />
                </button>
              </div>

              <button className="bg-[#1b1c1c] text-white px-6 py-2.5 h-11 rounded-lg flex items-center gap-2 font-['Geist:Medium'] font-medium text-[14px] hover:bg-[#2a2b2b] transition-colors">
                <Upload className="w-4 h-4" />
                {t("uploadAssets")}
              </button>
            </div>
          </div>
        </header>

        {/* Media Grid/List */}
        <div className="p-8">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {mediaItems.map((item, idx) => (
                <div
                  key={idx}
                  className="group border border-[#c1c6d7] rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-square bg-[#f5f5f5] flex items-center justify-center relative overflow-hidden">
                    {item.thumbnail ? (
                      <div className="w-full h-full bg-linear-to-br from-[#c1c6d7] to-[#e2e2e2]" />
                    ) : (
                      <div className="text-[#999]">{getIcon(item.type)}</div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>

                  <div className="p-3 bg-white">
                    <div className="font-['Geist:Medium'] font-medium text-[13px] text-[#1b1c1c] truncate mb-1">
                      {item.name}
                    </div>
                    <div className="flex items-center justify-between font-['Geist:Regular'] text-[11px] text-[#999]">
                      <span>{item.size}</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-[#c1c6d7] rounded-xl overflow-hidden">
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#fbf9f8] border-b border-[#c1c6d7] font-['Geist:Medium'] font-medium text-[11px] text-[#414754] tracking-[0.88px]">
                <div className="col-span-1">TYPE</div>
                <div className="col-span-4">NAME</div>
                <div className="col-span-2">SIZE</div>
                <div className="col-span-2">DIMENSIONS</div>
                <div className="col-span-3">DATE ADDED</div>
              </div>

              <div className="divide-y divide-[#c1c6d7]">
                {mediaItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#fbf9f8] transition-colors cursor-pointer">
                    <div className="col-span-1 text-[#414754]">{getIcon(item.type)}</div>
                    <div className="col-span-4 font-['Geist:Medium'] font-medium text-[14px] text-[#1b1c1c]">
                      {item.name}
                    </div>
                    <div className="col-span-2 font-['Geist:Regular'] text-[13px] text-[#414754]">{item.size}</div>
                    <div className="col-span-2 font-['Geist:Regular'] text-[13px] text-[#999]">{item.dimensions}</div>
                    <div className="col-span-3 font-['Geist:Regular'] text-[13px] text-[#999]">{item.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminSidebar>
  );
}
