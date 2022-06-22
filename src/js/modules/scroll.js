export default class Scroll {
	constructor({ entryAnimationClass, outroAnimationClass, pageUpButton }) {
		this.button = document.querySelector(pageUpButton);
		this.entryAnimation = entryAnimationClass;
		this.outroAnimation = outroAnimationClass;
	}

	init() {
		this.#toggleClass(this.button);
		this.button.addEventListener("click", event => {
			this.#scrollTo(event);
		});
	}

	#scrollTo(event) {
		event.preventDefault();
		const widthTop = document.documentElement.scrollTop;
		const hashUp = document.querySelector("header").hash;
		const toBlock = document.querySelector("header", "#up").getBoundingClientRect().top;
		let start = null;
		const speed = 0.01;
		requestAnimationFrame(step);

		function step(time) {
			if (start === null) {
				start = time;
			}
			const progress = time - start;
			const r =
				toBlock < 0
					? Math.max(widthTop - progress / speed, widthTop + toBlock)
					: Math.min(widthTop + progress / speed, widthTop + toBlock);
			document.documentElement.scrollTo(0, r);
			if (r !== widthTop + toBlock) {
				requestAnimationFrame(step);
			} else {
				window.location.hash = hashUp;
			}
		}
	}

	#toggleClass(trigger) {
		window.addEventListener("scroll", () => {
			if (
				document.documentElement.scrollTop > 1200 &&
				!trigger.classList.contains(this.entryAnimation)
			) {
				trigger.classList.add(this.entryAnimation);
				trigger.classList.remove(this.outroAnimation);
			} else if (
				document.documentElement.scrollTop < 1200 &&
				trigger.classList.contains(this.entryAnimation)
			) {
				trigger.classList.remove(this.entryAnimation);
				trigger.classList.add(this.outroAnimation);
			}
		});
	}
}
