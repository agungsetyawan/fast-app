import { withSerwist } from "@serwist/turbopack";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [new URL("https://vdxzyxpbrqhdyaowllko.supabase.co/**")],
  },
};

export default withSerwist(nextConfig);
