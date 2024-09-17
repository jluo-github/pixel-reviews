/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [getRemoteImageURL(process.env.CMS_IMAGE_URL)],
  },
};

export default nextConfig;

// helper function to get remote image url
function getRemoteImageURL(urlString) {
  const url = new URL(urlString);

  return {
    protocol: url.protocol.replace(":", ""),
    hostname: url.hostname,
    port: url.port,
    pathname: url.pathname,
  };
}
