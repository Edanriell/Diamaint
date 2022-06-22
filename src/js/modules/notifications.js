export default class Notifications {
	constructor({
		notificationText,
		showNotificationAnimationClass,
		removeNotificationAnimationClass,
		removeNotificationByTimeout,
		timeoutTime,
		errorIconSrc,
		warningIconSrc,
		successIconSrc,
		notificationLeftPos = 35,
		notificationBotPos = 40,
		notificationWidth = 640,
		notificationHeight = 120,
		notificationType = "error"
	}) {
		this.text = notificationText;
		this.showNotification = showNotificationAnimationClass;
		this.removeNotification = removeNotificationAnimationClass;
		this.removeNotificationTimeout = removeNotificationByTimeout;
		this.timeout = timeoutTime;
		this.errorIcon = errorIconSrc;
		this.warningIcon = warningIconSrc;
		this.successIcon = successIconSrc;
		this.notificationIsCreated = false;
		this.left = notificationLeftPos;
		this.bottom = notificationBotPos;
		this.width = notificationWidth;
		this.height = notificationHeight;
		this.type = notificationType;
	}

	init() {
		this.#createNotification();
	}

	#createNotification() {
		if (this.notificationIsCreated) return;
		if (!this.notificationIsCreated) {
			this.notificationIsCreated = true;

			const notificationWrapper = document.createElement("div");
			const notification = document.createElement("div");
			const notificationIconWrapper = document.createElement("div");
			const notificationIcon = document.createElement("img");
			const notificationText = document.createElement("p");
			const removeNotificationBtn = document.createElement("button");

			switch (this.type) {
				case "error":
					notificationIcon.src = this.errorIcon;
					break;
				case "warning":
					notificationIcon.src = this.warningIcon;
					break;
				case "success":
					notificationIcon.src = this.successIcon;
					break;
				default:
					notificationIcon.src = this.errorIcon;
			}

			notificationText.innerText = this.text;

			notificationIconWrapper.append(notificationIcon);
			notification.append(removeNotificationBtn, notificationIconWrapper, notificationText);
			notificationWrapper.append(notification);

			notificationWrapper.classList.add("Notification-Wrapper", this.showNotification);
			notification.classList.add("Notification");
			notificationIconWrapper.classList.add("Notification-IconWrapper");
			notificationIcon.classList.add("Notification-Icon");
			notificationText.classList.add("Notification-Text");
			removeNotificationBtn.classList.add("Notification-CloseBtn");

			document.querySelector("body").append(notificationWrapper);
			this.#removeNotification(notificationWrapper);
			this.#removeNotificationByTimeout(notificationWrapper, this.removeNotificationTimeout);
			this.#setStyles(notificationWrapper, notification);
		}
	}

	#removeNotification(notification) {
		const removeNotificationBtn = document.querySelector(".Notification-CloseBtn");
		removeNotificationBtn.addEventListener("click", () => {
			notification.classList.remove(this.showNotification);
			notification.classList.add(this.removeNotification);
			setTimeout(() => {
				notification.remove();
				this.notificationIsCreated = false;
			}, 250);
		});
	}

	#removeNotificationByTimeout(notification, timeout = false) {
		if (timeout) {
			setTimeout(() => {
				notification.classList.remove(this.showNotification);
				notification.classList.add(this.removeNotification);
				setTimeout(() => {
					notification.remove();
					this.notificationIsCreated = false;
				}, 250);
			}, this.timeout);
		}
	}

	#setStyles(notificationWrapper, notification) {
		notificationWrapper.style.cssText = `bottom: ${this.bottom}px; left: ${this.left}%;`;
		notification.style.cssText = `width: ${this.width}px; min-height: ${this.height}px`;
	}
}
