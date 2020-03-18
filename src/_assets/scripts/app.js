import PhotoSwipe from "photoswipe";
import PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";


const pswpButton = document.getElementById("pswp-button");

const openPhotoSwipe = function() {
	const pswpElement = document.querySelectorAll(".pswp")[0];

	let options = {
		history: true,
		focus: false,

		showAnimationDuration: 200,
		hideAnimationDuration: 200
	};

	let items = JSON.parse(pswpButton.dataset.gallery);

	console.log(items);

	let gallery = new PhotoSwipe(
		pswpElement,
		PhotoSwipeUI_Default,
		items,
		options
	);
	gallery.init();
};


pswpButton.onclick = openPhotoSwipe;

console.log(`I was loaded at ${Date(Date.now()).toString()}`);