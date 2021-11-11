const languagePreferenceHandler = require("./redirect-handlers/language-preference-handler");

/**
 * Checks if the pathname from the server request matches a redirect url.
 * If it does, returns the redirectValue. If not, returns null.
 *
 * @returns {object[]} - Returns all redirect values.
 */
async function getRedirectValues() {
  const redirectHandlers = [languagePreferenceHandler];
  return (await Promise.all(redirectHandlers.map(handler => handler.getRedirects()))).flat();
}

module.exports = {
  getRedirectValues,
};
