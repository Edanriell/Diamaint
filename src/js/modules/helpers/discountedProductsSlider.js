function disableButtonOnReachBeginning({ swiper, extendParams, on }) {
	const button = document.querySelector(".DiscountedProductsSliderControls-PreviousProduct");

	extendParams({
		debugger: true
	});

	on("init", () => {
		if (!swiper.params.debugger) return;
		if (
			swiper.activeIndex === 0 &&
			!button.classList.contains("DiscountedProductsSliderControls-ButtonDisabledPrevious")
		) {
			button.classList.remove("DiscountedProductsSliderControls-ButtonPrev");
			button.classList.add("DiscountedProductsSliderControls-ButtonDisabledPrevious");
			button.style.cssText = `
          pointer-events: none;
        `;
		}
	});

	on("slideChange", () => {
		if (!swiper.params.debugger) return;
		if (
			swiper.activeIndex === 0 &&
			!button.classList.contains("DiscountedProductsSliderControls-ButtonDisabledPrevious")
		) {
			button.classList.remove("DiscountedProductsSliderControls-ButtonPrev");
			button.classList.add("DiscountedProductsSliderControls-ButtonDisabledPrevious");
			button.style.cssText = `
          pointer-events: none;
        `;
		} else if (
			button.classList.contains("DiscountedProductsSliderControls-ButtonDisabledPrevious")
		) {
			button.classList.remove("DiscountedProductsSliderControls-ButtonDisabledPrevious");
			button.classList.add("DiscountedProductsSliderControls-ButtonPrev");
			button.style.cssText = `
        pointer-events: auto;
      `;
		}
	});
}

function disableButtonOnReachEnd({ swiper, extendParams, on }) {
	const button = document.querySelector(".DiscountedProductsSliderControls-NextProduct");

	extendParams({
		debugger: true
	});

	on("slideChange", () => {
		if (!swiper.params.debugger) return;
		if (
			swiper.activeIndex === swiper.slides.length - 1 &&
			!button.classList.contains("DiscountedProductsSliderControls-ButtonDisabledNext")
		) {
			button.classList.remove("DiscountedProductsSliderControls-ButtonNext");
			button.classList.add("DiscountedProductsSliderControls-ButtonDisabledNext");
			button.style.cssText = `
          pointer-events: none;
        `;
		} else if (
			button.classList.contains("DiscountedProductsSliderControls-ButtonDisabledNext")
		) {
			button.classList.remove("DiscountedProductsSliderControls-ButtonDisabledNext");
			button.classList.add("DiscountedProductsSliderControls-ButtonNext");
			button.style.cssText = `
        pointer-events: auto;
      `;
		}
	});
}

function additionalAnimationsEffects({ swiper, extendParams, on }) {
	const slideUnderlay = document.querySelectorAll(".DiscountedProductsSliderUnderlay");

	extendParams({
		debugger: true
	});
	on("init", () => {
		if (!swiper.params.debugger) return;
		slideUnderlay[swiper.activeIndex].style.cssText = `
      left: -40px;
      top: 40px;
    `;
	});

	on("slideChange", () => {
		if (!swiper.params.debugger) return;
		on("transitionEnd", () => {
			if (!swiper.params.debugger) return;
			slideUnderlay.forEach(slide => {
				slide.style.cssText = `
          left: 0;
          top: 0;
        `;
			});
			slideUnderlay[swiper.activeIndex].style.cssText = `
      left: -40px;
      top: 40px;
    `;
		});

		on("slideChangeTransitionStart", () => {
			if (!swiper.params.debugger) return;
			slideUnderlay.forEach(slide => {
				slide.style.cssText = `
          left: 0;
          top: 0;
        `;
			});
		});
	});
}

export { disableButtonOnReachBeginning, disableButtonOnReachEnd, additionalAnimationsEffects };
