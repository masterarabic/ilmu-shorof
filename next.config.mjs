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
};

export default nextConfig;
