'use strict'

class ReferredLinkController {
	constructor({ ReferredLinkChat, ErrorHandler }) {
		this.referredLinkChat = ReferredLinkChat
		this.errorHandler = ErrorHandler
	}

	async sendReferradLink(CTX) {
		try {
			return this.referredLinkChat.sendReferredLink(CTX)
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}
}
module.exports = ReferredLinkController
