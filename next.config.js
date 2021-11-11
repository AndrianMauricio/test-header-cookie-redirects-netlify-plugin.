const { DEFAULT_LANGUAGE, ALL_LANGUAGE_CODES } = require("./lib/i18n");

/** @type {import('next').NextConfig} */
module.exports = () => {
  const config = {
    reactStrictMode: true,

    async redirects() {
      const { getRedirectValues } = require("./server/request-service");
      return await getRedirectValues();
    },

    i18n: {
      locales: ALL_LANGUAGE_CODES,
      defaultLocale: DEFAULT_LANGUAGE,
      localeDetection: true,
    },
  };

  return config;
};
