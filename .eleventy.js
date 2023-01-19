const Image = require("@11ty/eleventy-img");
const { DateTime } = require("luxon");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(`./src${src}`, {
    widths: [300, 800, null],
    formats: ["avif", "jpeg", "jpg", "png", "svg"],
    urlPath: "/images/",
    outputDir: "./_site/images/"
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async"
  };

  return Image.generateHTML(metadata, imageAttributes);
}


module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/css/");
    eleventyConfig.addWatchTarget("./src/css/");
    eleventyConfig.addPassthroughCopy("./src/images/");
    eleventyConfig.addPassthroughCopy({ "./src/favicons": "/" });
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
    eleventyConfig.addNunjucksAsyncShortcode("EleventyImage", imageShortcode);
    eleventyConfig.addFilter("asPostDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
         // other config likely here
       });


    return {
      dir: {
        input: "src",
        output: "_site"
      }
    };
  };
  