import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/returns", destination: "/pages/returns", permanent: true },
      { source: "/faq", destination: "/pages/faq", permanent: true },
      { source: "/privacy", destination: "/pages/privacy", permanent: true },
      { source: "/privacy-policy", destination: "/pages/privacy", permanent: true },
      { source: "/terms", destination: "/pages/terms", permanent: true },
      { source: "/terms-and-conditions", destination: "/pages/terms", permanent: true },
      { source: "/shipping", destination: "/pages/shipping", permanent: true },
      { source: "/about", destination: "/pages/about", permanent: true },
      { source: "/contact", destination: "/pages/contact", permanent: true },
      { source: "/order-confirmation", destination: "/checkout/success", permanent: false },
    ];
  },
};

export default nextConfig;
