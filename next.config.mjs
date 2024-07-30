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
      {
        source: "/pelajaran",
        destination: "/belajar",
        permanent: false,
      },
      {
        source: "/pelajaran/bab",
        destination: "/belajar",
        permanent: false,
      },
      {
        source: "/pelajaran/bab/:babNumber/tugas",
        destination: "/pelajaran/bab/:babNumber/tugas/1",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
