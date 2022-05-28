/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  images: {
      domains: ['apod.nasa.gov'],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
}