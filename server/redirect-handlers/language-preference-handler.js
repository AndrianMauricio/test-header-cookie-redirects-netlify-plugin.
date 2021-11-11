//@ts-check
const { LANGUAGE_CODES, DEFAULT_LANGUAGE } = require("../../lib/i18n");

// Loads Next.js config module to get process.env set up right for loadData.
require("../../next.config");

const languagePreferenceHandler = {
  getRedirects: async function () {
    const acceptLanguage = LANGUAGE_CODES.map(code => ({
      source: `/:path*`,
      has: [
        {
          type: "header",
          key: "Accept-Language",
          value: code,
        },
      ],
      destination: `/${code}/:path*`,
      permanent: false,
    }));

    const cookie = LANGUAGE_CODES.map(code => ({
      source: `/${DEFAULT_LANGUAGE}/:path*`,
      has: [
        {
          type: "cookie",
          key: "NEXT_LOCALE",
          value: code,
        },
      ],
      locale: false,
      destination: `/${code}/:path*`,
      permanent: false,
    }));

    return [...acceptLanguage, ...cookie];
  },
};

module.exports = languagePreferenceHandler;
