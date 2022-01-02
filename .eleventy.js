const socialImages = require("@11tyrocks/eleventy-plugin-social-images");
const emojiRegex = require("emoji-regex");
const slugify = require("slugify");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const packageVersion = require("./package.json").version;
const pinyinUtils = require("pinyin-utils");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(socialImages);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addWatchTarget("./src/sass/");

  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/favicon.png");
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml",
  });

  eleventyConfig.addCollection("myCollectionName", function (collectionApi) {
    // get unsorted items
    return collectionApi.getAll();
  });

  const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

  eleventyConfig.addShortcode(
    "ruDate",
    () => `${new Date().toLocaleDateString("ru-ru", dateOptions)}`
  );
  eleventyConfig.addShortcode(
    "zhDate",
    () => `${new Date().toLocaleDateString("zh-cn", dateOptions)}`
  );
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode("packageVersion", () => `v${packageVersion}`);
  eleventyConfig.addShortcode("randomGrammar", () => {
    const grammar_ = require("./src/_data/grammar.json");
    const item_ = grammar_[Math.floor(Math.random() * grammar_.length)];

    return `<div class="tdbc-section">
    <ul class="tdbc-column-container">
      <li class="tdbc-card">
        <div class="tdbc-card__content">
          <a href="${item_.link}" class="tdbc-card__title">${item_.title}</a>
          <p> ${item_.description}</p>
        </div>
      </li>
    </ul>
  </div>`;
  });
  eleventyConfig.addShortcode("pinyin", function (hanzi, pinyin, definition) {
    const pinyined = pinyin
      .split(" ")
      .map((pi) => pinyinUtils.numberToMark(pi))
      .join(" "); //pinyinUtils.numberToMark(pinyin);
    // version 1 uses only tag, and pinyin-utils
    const ruby = `<ruby>
    ${hanzi}<rp>(</rp><rt>${pinyined}</rt><rp>)</rp>
    </ruby>`;
    if (definition) {
      return `<dl style="display: flex; flex-direction: row;">
      <dt>
      ${ruby}</dt>
      <dd style="margin-left: 1em;">${definition}</dd>
      </dl>`;
    } else {
      return ruby;
    }
  });

  eleventyConfig.addFilter("slug", (str) => {
    if (!str) {
      return;
    }

    const regex = emojiRegex();
    // Remove Emoji first
    let string = str.replace(regex, "");

    return slugify(string, {
      lower: true,
      replacement: "-",
      remove: /[*+~·,()'"`´%!?¿:@\/]/g,
    });
  });

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "tdbc-anchor",
    permalinkSymbol: "#",
    permalinkSpace: false,
    level: [1, 2, 3],
    slugify: (s) =>
      s
        .trim()
        .toLowerCase()
        .replace(/[\s+~\/]/g, "-")
        .replace(/[().`,%·'"!?¿:@*]/g, ""),
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  return {
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "public",
    },
  };
};
