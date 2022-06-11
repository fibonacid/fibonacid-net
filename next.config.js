const withTM = require("next-transpile-modules")(["gsap"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = withTM(nextConfig);
