//@ts-check
const { stripLeadingSlash } = require("../lib/string-utils");

const DEFAULT_LANGUAGE = "en";
const LANGUAGE_CODES = ["de", "es", "fr", "it", "ja", "ko", "nl", "pl", "pt", "ru", "sv", "zh-tw"];
const ALL_LANGUAGE_CODES = LANGUAGE_CODES.concat(DEFAULT_LANGUAGE);

/**
 * Determine if we are on an i18n page or not based on the possible existence
 * of a language code in the URL.
 *
 * @param {string} [pagePath] - optional path to detect language on. If not provided, will default
 * to window.location.pathname
 * @returns {string} language code for the page
 */
function getPageLanguage(pagePath) {
  pagePath = stripLeadingSlash(pagePath);
  // English Homepage edge-case
  if (pagePath === "") return DEFAULT_LANGUAGE;

  let currentPathFirstSegment = pagePath.split("/")[0];

  return LANGUAGE_CODES.indexOf(currentPathFirstSegment) > -1
    ? currentPathFirstSegment
    : DEFAULT_LANGUAGE;
}

/**
 * @param {string} [pagePath] - optional path to detect language on. If not provided, will default
 * to window.location.pathname
 * @return {boolean}
 */
function isPageLanguageDefault(pagePath) {
  return getPageLanguage(pagePath) === DEFAULT_LANGUAGE;
}

module.exports = {
  DEFAULT_LANGUAGE,
  LANGUAGE_CODES,
  ALL_LANGUAGE_CODES,
  isPageLanguageDefault,
};
