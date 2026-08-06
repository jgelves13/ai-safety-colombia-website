import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Dev only. Next blocks cross-origin requests to dev assets, so opening the
     server on a LAN address serves the HTML but not the client chunks — the
     page renders and never hydrates. These are the local addresses we open it
     from; it has no effect on a production build. */
  allowedDevOrigins: ["192.168.56.1", "10.195.13.169"],
};

export default nextConfig;
