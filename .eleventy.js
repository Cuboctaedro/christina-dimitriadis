const {
    DateTime
} = require("luxon");
const htmlmin = require("html-minifier");
const yaml = require("js-yaml");

const galleryData = require("./filters/gallerydata");

module.exports = function (eleventyConfig) {
    // Folders to copy to build dir (See. 1.1)
    eleventyConfig.addPassthroughCopy("src/static");
    eleventyConfig.addPassthroughCopy("src/admin");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/photoswipe");

    if (process.env.ELEVENTY_ENV === 'production') {
        // Minify HTML (including inlined CSS and JS) 
        eleventyConfig.addTransform("compressHTML", function (content, outputPath) {
            if (outputPath.endsWith(".html")) {
                let minified = htmlmin.minify(content, {
                    useShortDoctype: true,
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true
                });
                return minified;
            }
            return content;
        });
    }

    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, {
            zone: 'utc'
        }).toFormat('yyyy-LL-dd');
    });

    eleventyConfig.addFilter("galleryData", galleryData);

    // Add YAML support for data files
    eleventyConfig.addDataExtension("yaml", contents => yaml.safeLoad(contents));

    // This allows Eleventy to watch for file changes during local development.
    eleventyConfig.setUseGitIgnore(false);

    eleventyConfig.addCollection("workSorted", function(collection) {
        return collection.getFilteredByTag("work").sort(function(a, b) {
            return b.data.order - a.data.order;
        });
    });

    eleventyConfig.addCollection("booksSorted", function(collection) {
        return collection.getFilteredByTag("book").sort(function(a, b) {
            return b.data.order - a.data.order;
        });
    });

    eleventyConfig.addCollection("textsSorted", function(collection) {
        return collection.getFilteredByTag("text").sort(function(a, b) {
            return b.data.order - a.data.order;
        });
    });    
    return {
        dir: {
            input: "src/",
            output: "dist",
            includes: "_includes",
            layouts: "_layouts"
        },
        templateFormats: ["html", "md", "njk"],
        htmlTemplateEngine: "njk",

        // 1.1 Enable eleventy to pass dirs specified above
        passthroughFileCopy: true
    };
};