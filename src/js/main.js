import "../sass/main.sass";
import "swiper/css";
import Swiper, { Navigation, Mousewheel, Keyboard, Autoplay, EffectCreative } from "swiper";
import {
	disableButtonOnReachBeginning,
	disableButtonOnReachEnd,
	additionalAnimationsEffects
} from "./modules/helpers/discountedProductsSlider";
import ImageChanger from "./modules/imageChanger";
import Scroll from "./modules/scroll";
import AdviceModal from "./modules/adviceModal";
import spinner from "../img/spinner.svg";
import spinnerBlue from "../img/spinnerBlue.svg";

Swiper.use([Navigation, Mousewheel, Keyboard, Autoplay, EffectCreative]);

window.addEventListener("load", () => {
	const discountedProductsSlider = new Swiper(".DiscountedProductsSlider", {
		slidesPerView: 1,
		spaceBetween: 100,
		speed: 400,
		grabCursor: true,
		mousewheel: true,
		keyboard: {
			enabled: true,
			onlyInViewport: false
		},
		navigation: {
			nextEl: ".DiscountedProductsSliderControls-NextProduct",
			prevEl: ".DiscountedProductsSliderControls-PreviousProduct"
		},
		effect: "creative",
		creativeEffect: {
			prev: {
				shadow: true,
				translate: [0, 0, -900]
			},
			next: {
				translate: ["200%", 0, 0]
			}
		},
		modules: [
			disableButtonOnReachBeginning,
			disableButtonOnReachEnd,
			additionalAnimationsEffects
		]
	});

	const imageChanger = new ImageChanger({
		targetImage: ".CreatorsMainImage",
		triggerImages: ".ImageList-Item",
		triggerActiveClass: "ImageList-ActiveImage",
		spinnerSrc: spinner
	});

	const scroll = new Scroll({
		pageUpButton: ".Pageup",
		entryAnimationClass: "PageupButtonFadeIn",
		outroAnimationClass: "PageupButtonFadeOut"
	});

	const adviceModal = new AdviceModal({
		itemModalSelector: ".SingleItemModal",
		triggersParentElement: ".AdvicesList",
		database: "http://localhost:3000/advices",
		spinnerSrc: spinnerBlue,
		triggerIsButton: true
	});

	discountedProductsSlider.init();
	imageChanger.init();
	scroll.init();
	adviceModal.init();
});
