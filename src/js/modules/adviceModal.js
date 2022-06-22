import { getResource } from "./services/requests";
import Modal from "./modal.js";
import Notifications from "./notifications.js";
import errorIcon from "../../img/modules/Notifications/error.svg";
import warningIcon from "../../img/modules/Notifications/warning.svg";
import successIcon from "../../img/modules/Notifications/success.svg";

export default class AdviceModal {
	static notification = false;

	static modalLock = false;

	constructor({
		itemModalSelector,
		triggersParentElement,
		database,
		spinnerSrc,
		triggerIsButton
	}) {
		this.modal = document.querySelector(itemModalSelector);
		this.db = database;
		this.spinner = spinnerSrc;
		this.triggersParent = document.querySelector(triggersParentElement);
		this.triggersLive = this.triggersParent.children;
		this.triggerButton = triggerIsButton;
	}

	init() {
		if (this.triggerButton) {
			for (const element of this.triggersLive) {
				element.querySelector("button").addEventListener("click", this.#cardOnClick);
			}
		} else {
			for (const element of this.triggersLive) {
				element.addEventListener("click", this.#cardOnClick);
			}
		}
	}

	#cardOnClick = event => this.#fetchData(event.target, this.#getId(event.target));

	#fetchData(element, id) {
		// if (AdviceModal.notification) return;
		getResource(this.db)
			.then(data => {
				if (!AdviceModal.modalLock) {
					AdviceModal.modalLock = true;
					this.#createItemModal(id, data);
				}
			})
			.catch(error => {
				if (error.name === "NetworkError") {
					AdviceModal.displayNotification(
						"Пожалуйста, проверьте подключение к интернету.",
						"error"
					);
				} else if (error instanceof TypeError) {
					AdviceModal.displayNotification(
						"Не удалось получить данные с сервера, повторите попытку позже.",
						"error"
					);
				} else {
					AdviceModal.displayNotification(error, "error");
				}
			});
	}

	#createItemModal(id, data) {
		const filteredData = data.filter(item => {
			return item.id === id;
		});
		const [{ header, decription, decription2, category }] = filteredData;
		this.#updateItemModalContent(header, decription, decription2, category);
		this.#showModal();
	}

	#updateItemModalContent(header, decription, decription2, category) {
		this.#displayModalSpinner();

		const itemHeader = this.modal.querySelector("[data-single-item-modal='item-header']");
		const itemFullDescription = this.modal.querySelector(
			"[data-single-item-modal='item-full-description']"
		);
		const itemFullDescription2 = this.modal.querySelector(
			"[data-single-item-modal='item-full-description2']"
		);
		const itemCategory = this.modal.querySelector("[data-single-item-modal='item-category']");

		itemHeader.innerText = header;
		itemFullDescription.innerText = decription;
		itemFullDescription2.innerText = decription2;
		itemCategory.innerText = category;

		this.#removeModalSpinner();
	}

	#displayModalSpinner() {
		const spinnerWrapper = document.createElement("div");
		spinnerWrapper.classList.add("ModalSpinnerWrapper");
		spinnerWrapper.style.cssText = `
      width: inherit;
      height: inherit;
      max-height: inherit;
      max-width: inherit;
      background: inherit;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-sizing: border-box;
    `;

		this.modal.append(spinnerWrapper);
		this.#displaySpinner(spinnerWrapper);
	}

	#removeModalSpinner() {
		const modalSpinnerWrapper = document.querySelector(".ModalSpinnerWrapper");
		setTimeout(() => {
			modalSpinnerWrapper.firstChild.classList.add("FadeOutModalElement");
			setTimeout(() => {
				modalSpinnerWrapper.classList.add("FadeOutModalElement");
				setTimeout(() => {
					modalSpinnerWrapper.remove();
					AdviceModal.modalLock = false;
				}, 200);
			}, 200);
		}, 1600);
	}

	#displaySpinner(element) {
		element.style.pointerEvents = "none";
		element.style.userSelect = "none";
		// element.children[0].style.cssText = "filter: blur(8px);";
		const loaderImg = document.createElement("img");
		loaderImg.classList.add("loader");
		loaderImg.src = this.spinner;
		loaderImg.style.cssText = `
        position: absolute;
        height: 120px;
        width: 120px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
      `;
		element.append(loaderImg);
	}

	#hideSpinner(element) {
		document.querySelector(".loader").remove();
		// element.children[0].style.cssText = "filter: blur(0);";
		element.style.pointerEvents = "auto";
		element.style.userSelect = "auto";
	}

	static displayNotification(notificationText, notificationType) {
		if (AdviceModal.notification) return;
		AdviceModal.notification = true;
		const notifications = new Notifications({
			notificationText,
			errorIconSrc: errorIcon,
			warningIconSrc: warningIcon,
			successIconSrc: successIcon,
			showNotificationAnimationClass: "ErrorFadeIn",
			removeNotificationAnimationClass: "ErrorFadeOut",
			removeNotificationByTimeout: true,
			notificationWidth: 700,
			timeoutTime: 5000,
			notificationType
		});
		notifications.init();
		setTimeout(() => {
			AdviceModal.notification = false;
		}, 5000);
	}

	#showModal() {
		const modal = new Modal({
			modalSelector: ".SingleItemModal",
			modalWrapperSelector: ".SingleItemModal-Wrapper",
			showAnimationClass: "modal-fade-in",
			hideAnimationClass: "modal-fade-out",
			closeModalTriggerBtn: "[data-single-item-modal='close-modal']",
			closeModalWindowByEsc: true,
			closeModalWindowByClickAndBtn: true
		});
		modal.showModal();
	}

	#checkTrigger = element => {
		if (this.triggerButton) {
			const { parentElement } = element;
			const newElement = parentElement.parentElement;
			return newElement;
		}
		return element;
	};

	#getId(targetElement) {
		if (this.triggerButton) {
			return targetElement.parentElement.id;
		}
		return targetElement;
	}
}
