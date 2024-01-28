/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.dummyjson.com",
        pathname: "/data/products/**",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/a/*",
        port: "",
      },
      {
        protocol: "https",
        hostname: "*",
        pathname: "/**",
        port: "",
      },
    ],
  },
  typescript: { ignoreBuildErrors: true },
  redirects: () => {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
