'use strict'

class ValidateChat {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async sendErrorKeyWallet(CTX) {
		return await CTX.reply(this.messageString.succesClient)
	}

	async clientExist(CTX) {
		return await CTX.reply(this.messageString.clientExistError)
	}
}
module.exports = ValidateChat
