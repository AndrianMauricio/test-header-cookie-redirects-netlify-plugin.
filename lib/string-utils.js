//@ts-check

/**
 * Takes an input string and removes the leading slash if applicable
 *
 * @param {string} [text] - Input string to strip
 * @return {string}
 */
function stripLeadingSlash(text) {
  if (!text) return "";
  return text.startsWith("/") ? text.substr(1) : text;
}

/**
 * Takes an input string and removes the trailing slash if applicable
 *
 * @param {string} [text] - Input string to strip
 * @return {string}
 */
function stripTrailingSlash(text) {
  if (!text) return "";
  return text.endsWith("/") ? text.slice(0, -1) : text;
}

module.exports = {
  stripLeadingSlash,
  stripTrailingSlash,
};
