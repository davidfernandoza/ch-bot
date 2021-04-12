'use strict'

class ValidateChat {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async sendErrorKeyWallet(CTX) {
		return await CTX.reply(this.messageString.addresUnavalible)
	}

	async clientExist(CTX) {
		return await CTX.reply(this.messageString.clientExistError)
	}

	async clientNotExist(CTX) {
		return await CTX.reply(this.messageString.clientNotExistError)
	}

	async chatIsBot(CTX) {
		return await CTX.reply(this.messageString.isBot)
	}
}
module.exports = ValidateChat
