'use strict'

class PhoneChat {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async getPhoneMessage(CTX) {
		try {
			return await CTX.replyWithMarkdown(this.messageString.getPhoneMessage)
		} catch (error) {
			throw new Error(error)
		}
	}

	async setPhoneCorrectly(CTX) {
		try {
			return await CTX.replyWithMarkdown(this.messageString.setPhone)
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = PhoneChat
