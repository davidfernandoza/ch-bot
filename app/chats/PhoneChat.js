'use strict'

class PhoneChat {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async getPhoneMessage(CTX) {
		return await CTX.replyWithMarkdown(this.messageString.getPhoneMessage)
	}

	async setPhoneCorrectly(CTX) {
		return await CTX.replyWithMarkdown(this.messageString.setPhone)
	}
}
module.exports = PhoneChat
