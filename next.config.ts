import type { NextConfig } from "next";

const SUPABASE_ENDPOINT = new URL(
  `${process.env.SUPABASE_URL}/${process.env.SUPABASE_BUCKET_PATHNAME}/**`
);
const AWS_ENDPOINT = new URL(
  `${process.env.AWS_ENDPOINT}/${process.env.AWS_BUCKET_PATHNAME}/**`
);

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: SUPABASE_ENDPOINT.hostname,
        pathname: SUPABASE_ENDPOINT.pathname,
      },
      {
        protocol: "https",
        hostname: AWS_ENDPOINT.hostname,
        pathname: AWS_ENDPOINT.pathname,
      },
    ],
  },
};

export default nextConfig;
