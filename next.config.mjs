/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  //output: "export",
  distDir: "out", // This is where the static files will be generated
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
