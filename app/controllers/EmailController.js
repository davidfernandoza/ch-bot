'use strict'

class EmailController {
	constructor({ ErrorHandler, EmailDomain, EmailChat }) {
		this.errorHandler = ErrorHandler
		this.emailDomain = EmailDomain
		this.emailChat = EmailChat
	}

	async setActionForGetEmail(CTX) {
		try {
			await this.emailDomain.setActiveEmailStatus(CTX)
			return this.emailChat.getEmailMessage(CTX)
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}

	async setEmailToClient(CTX) {
		try {
			if (await this.emailDomain.setEmailForClient(CTX)) {
				return await this.emailChat.setEmailCorrectly(CTX)
			} else throw new Error('Error in setEmailToClient method')
		} catch (error) {
			this.errorHandler.sendError(CTX, error)
		}
	}
}
module.exports = EmailController
