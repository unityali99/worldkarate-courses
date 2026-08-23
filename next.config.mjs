/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [50, 75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
