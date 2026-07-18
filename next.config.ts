import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "mtgwpwjvazvfljdiuufm.supabase.co", // 🌟 エラーに出ているホスト名を設定
        port: "",
        pathname: "/**" // 🌟 そのドメインの全てのパスを許可
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb"
    }
  }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
