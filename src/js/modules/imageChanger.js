export default class ImageChanger {
	static spinnerCreated = false;

	static imageSwitching = false;

	constructor({
		targetImage,
		triggerImages,
		spinnerSrc,
		triggerActiveClass,
		createdSpinnerClass
	}) {
		this.target = document.querySelector(targetImage);
		this.triggers = document.querySelectorAll(triggerImages);
		this.activeClass = triggerActiveClass;
		this.spinnerClass = createdSpinnerClass ?? "ImageSpinner";
		this.spinner = spinnerSrc;
	}

	init() {
		this.triggers.forEach(trigger => {
			trigger.addEventListener("click", event => {
				if (trigger.classList.contains(this.activeClass)) return;
				this.#switchImage(event);
			});
		});
	}

	#switchImage(e) {
		if (!ImageChanger.imageSwitching) {
			this.#displayLoader(e);
			this.#changeImage(e);
		}
	}

	#displayLoader(e) {
		ImageChanger.imageSwitching = true;
		this.#switchImageActiveClass(e);
		const targetImageWrapper = this.target.parentNode;
		this.target.style.cssText = `
      filter: blur(12px);
      transition: all 0.25s ease-in-out;
    `;
		this.#createSpinner(targetImageWrapper);
	}

	#changeImage(e) {
		setTimeout(() => {
			this.target.src = e.target.src;
			this.#removeSpinner();
		}, 500);
	}

	#switchImageActiveClass(e) {
		this.triggers.forEach(trigger => {
			if (trigger.classList.contains(this.activeClass))
				trigger.classList.remove(this.activeClass);
		});
		e.target.parentNode.classList.add(this.activeClass);
	}

	#createSpinner(imageWrapper) {
		if (!ImageChanger.spinnerCreated) {
			const spinner = document.createElement("img");
			spinner.setAttribute("src", this.spinner);
			spinner.style.cssText = `
        width: 120px;
        height: 120px;
        top: 50%;
        left: 50%;
        position: absolute;
        z-index: 2;
        transform: translate(-50%, -50%);
      `;
			spinner.classList.add(this.spinnerClass);
			ImageChanger.spinnerCreated = true;
			imageWrapper.append(spinner);
		}
	}

	#removeSpinner() {
		if (ImageChanger.spinnerCreated) {
			const spinner = document.querySelector(`.${this.spinnerClass}`);
			setTimeout(() => {
				this.target.style.cssText = `
          filter: blur(0px);
        `;
				spinner.remove();
				ImageChanger.spinnerCreated = false;
				ImageChanger.imageSwitching = false;
			}, 1000);
		}
	}
}
