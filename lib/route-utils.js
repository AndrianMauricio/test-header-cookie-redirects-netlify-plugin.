//@ts-check
const { stripTrailingSlash, stripLeadingSlash } = require("./string-utils");
const { DEFAULT_LANGUAGE, LANGUAGE_CODES } = require("./i18n");
const path = require("path");

/**
 * check if there are any query strings and/or hashes and remove them all
 *
 * @param {string} path
 * @return {string} cleanPath
 */
function cleanPath(path) {
  let output = path.split("?")[0].split("#")[0];
  return stripTrailingSlash(output);
}

/**
 * Takes a path and a language code and either:
 * - prepends the language code to the beginning of the path if it is NOT the default language
 * - returns the original path if it IS the default language
 * @param {string} language
 * @param {string} routePath
 * @param {object} [options]
 * @param {string} [options.defaultLanguage] - any value passed will be treated as the default value, and will not be
 *                                           appended to the path if provided as the "language" param
 * @return {string}
 */

function prependLanguagePath(
  language = DEFAULT_LANGUAGE,
  routePath,
  options = { defaultLanguage: DEFAULT_LANGUAGE },
) {
  // Return routePath if it's an absolute url
  if (/(^http)/.test(routePath)) return routePath;

  // Check if path is root. `cleanPath`  will return '' for /?noredirect and /
  const isRootPath = !cleanPath(routePath);

  //Create a regex for root (homepage) path (internationalized or not). ie /fr?noredirect
  const isRootLanguageRoute = new RegExp(`(^\\/?(${LANGUAGE_CODES.join("|")})$)`);

  // Create a regex that matches any of the language codes at the start of a path
  const isLanguageRoute = new RegExp(`(^\\/?(${LANGUAGE_CODES.join("|")})\\/.+)`);
  const defaultLanguage = options.defaultLanguage || DEFAULT_LANGUAGE;

  let outputPath;
  if (
    isLanguageRoute.test(routePath) || // routePath is already internationalized
    language === defaultLanguage || // provided language is English US
    !/(^[^:]*$)/.test(routePath) || // if the route path contains a colon (e.g., mailto: and http: URLs)
    /(^(#).+)/.test(routePath) || // the route path contains a #
    isRootLanguageRoute.test(cleanPath(routePath)) //is internationalized homepage
  ) {
    outputPath = routePath;
  } else if (isRootPath) {
    // this should only occur for the non-internationalized homepage
    outputPath = path.join(language + stripLeadingSlash(routePath));
  } else {
    outputPath = path.join(language, routePath);
  }

  // Standardize output to always have a leading slash
  return "/" + stripLeadingSlash(outputPath);
}

module.exports = {
  prependLanguagePath,
};
