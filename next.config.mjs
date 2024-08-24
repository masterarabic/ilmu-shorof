/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/belajar",
        permanent: false,
      },
    ];
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

export default nextConfig;
