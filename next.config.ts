import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "ftp.goit.study" },
      { protocol: "https", hostname: "cdn.pixabay.com" },
      { protocol: "https", hostname: "media.istockphoto.com" },
    ],
  },
};

export default nextConfig;
