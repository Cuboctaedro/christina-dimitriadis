const sizeOf = require('image-size');


module.exports = function (gallery) {
    let dataGallery = [];
    gallery.forEach((image) => {
        let imageObj;
        if (process.env.ELEVENTY_ENV == 'production') {
            imageObj = {
                w: sizeOf("./src/" + image).width,
                h: sizeOf("./src/" + image).height,
                src: "https://christina-dimitriadis.netlify.com/" + image
            };
        } else {
            imageObj = {
                w: sizeOf("./src/" + image).width,
                h: sizeOf("./src/" + image).height,
                src: "http://localhost:8080/" + image
            };
        }
        dataGallery.push(imageObj);
    });
    return JSON.stringify(dataGallery);
}