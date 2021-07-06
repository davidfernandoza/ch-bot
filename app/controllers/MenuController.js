'use strict'

class MenuController {
	constructor({ MenuChat, ErrorHandler }) {
		this.menuChat = MenuChat
		this.errorHandler = ErrorHandler
	}

	async openMenu(CTX) {
		try {
			return this.menuChat.openMenu(CTX)
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}

	async openReferralsMenu(CTX) {
		try {
			return this.menuChat.referralsMenu(CTX)
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}

	async openChargeMenu(CTX) {
		try {
			return this.menuChat.chargeMenu(CTX)
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}

	async openCycleMenu(CTX) {
		try {
			return this.menuChat.cycleMenu(CTX)
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}
	async openRulesMenu(CTX) {
		try {
			return this.menuChat.rulesMenu(CTX)
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}
	async openMyInfoMenu(CTX) {
		try {
			return this.menuChat.myInfoMenu(CTX)
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}

	async openWebKValidate(CTX) {
		try {
			return this.menuChat.sendWebKMessage(CTX)
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}
}
module.exports = MenuController
