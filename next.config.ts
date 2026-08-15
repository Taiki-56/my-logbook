/**
 * Next.js application configuration.
 *
 * Configures external image optimization domains (Unsplash, Supabase),
 * increases the payload size limit for server actions (to support image uploads),
 * and wraps the configuration with the next-intl plugin for i18n support.
 */

import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // * Allow Unsplash images for default/placeholder thumbnails
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      // * Allow Supabase storage for user-uploaded media (thumbnails, content images)
      {
        protocol: "https",
        hostname: "mtgwpwjvazvfljdiuufm.supabase.co",
        port: "",
        pathname: "/**"
      }
    ]
  },
  experimental: {
    serverActions: {
      // * Increase body size limit to allow uploading high-resolution images
      bodySizeLimit: "10mb"
    }
  }
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
