const sizeOf = require('image-size');


module.exports = function (gallery) {
    let dataGallery = [];
    gallery.forEach((image) => {
        let imageObj = {
					w: sizeOf("./src/" + image).width,
					h: sizeOf("./src/" + image).height,
					src: "http://localhost:8080/" + image
				};
        dataGallery.push(imageObj);
    });
    return JSON.stringify(dataGallery);
}