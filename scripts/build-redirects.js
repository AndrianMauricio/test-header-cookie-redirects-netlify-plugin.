const path = require("path");
const fs = require("fs");

const { getRedirectValues } = require("../server/request-service");
const { LANGUAGE_CODES } = require("../lib/i18n");
const { prependLanguagePath } = require("../lib/route-utils");

const isLangPathRegexp = new RegExp(`^(\\/(${LANGUAGE_CODES.join("|")})\\/)`);

async function copyFile(from, to) {
  return new Promise((resolve, reject) => {
    fs.copyFile(path.resolve(__dirname, from), path.resolve(__dirname, to), err => {
      if (err) reject(err);
      console.log("File was copied to destination");
      resolve();
    });
  });
}

async function main() {
  await copyFile("../_redirects", "../.next/_redirects");
  return;
  // this function would modify the _redirects file after "next build" is successfull
  // but for the sake of testing this repo I modified the _redirects file manually
  const redirects = await getRedirectValues();

  const data = redirects.reduce((prev, curr) => {
    const { source, destination, permanent } = curr;
    if (!source || !destination) return prev;
    const type = permanent == null ? 200 : permanent ? 301 : 302;
    let rule = prev;

    // If the redirect rule has a locale, don't i18nify it.
    // Else, create a separate rule for each locale.
    if (isLangPathRegexp.test(source)) {
      rule += `${source} ${destination} ${type}\n`;
    } else {
      rule += LANGUAGE_CODES.reduce((i18nifiedRules, langCode) => {
        const i18nSource = prependLanguagePath(langCode, source);
        const i18nDest = prependLanguagePath(langCode, destination);
        return `${i18nifiedRules}${i18nSource} ${i18nDest} ${type}\n`;
      }, `${source} ${destination} ${type}\n`);
    }

    return rule;
  }, "");

  fs.readFile(path.resolve(__dirname, "../_redirects"), "utf-8", (errReading, previousContent) => {
    if (errReading) throw errReading;

    // Ensure we have a new line between old and new content
    const newContent = previousContent + "\n" + data;

    fs.writeFile(path.resolve(__dirname, "../_redirects"), newContent, "utf-8", err => {
      if (err) throw err;
      console.log("The _redirects file was successfully created!");
    });
  });
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
