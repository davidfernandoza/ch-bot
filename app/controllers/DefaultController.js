'use strict'

class DefaultController {
	constructor({ ValidateChat, DefaultActionDomain, ErrorHandler, MenuChat }) {
		this.validateChat = ValidateChat
		this.defaultActionDomain = DefaultActionDomain
		this.menuChat = MenuChat
		this.errorHandler = ErrorHandler
	}

	async defaultHandler(CTX) {
		try {
			return await this.validateChat.sendDefaultMessage(CTX)
		} catch (error) {
			this.errorHandler.sendError(CTX, error)
		}
	}

	async cancelHandler(CTX) {
		try {
			await this.defaultActionDomain.actionCancelHandler(CTX)
			await this.validateChat.actionCancelMessage(CTX)
			return await this.menuChat.openMenu(CTX)
		} catch (error) {
			this.errorHandler.sendError(CTX, error)
		}
	}

	async otherTextSended(CTX) {
		try {
			return await this.validateChat.otherTextSended(CTX)
		} catch (error) {
			this.errorHandler.sendError(CTX, error)
		}
	}
}
module.exports = DefaultController
