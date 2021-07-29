'use strict'

class EmailChat {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async getEmailMessage(CTX) {
		try {
			return await CTX.replyWithMarkdown(this.messageString.getEmailMessage)
		} catch (error) {
			throw new Error(error)
		}
	}

	async setEmailCorrectly(CTX) {
		try {
			return await CTX.replyWithMarkdown(this.messageString.setEmail)
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = EmailChat
