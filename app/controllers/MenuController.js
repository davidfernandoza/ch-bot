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
	async openWebKValidate(CTX) {
		try {
			return this.menuChat.sendWebKMessage(CTX)
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}
}
module.exports = MenuController
