'use strict'

class ValidateView {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async sendErrorKeyWallet(CTX) {
		return await CTX.reply(this.messageString.succesClient)
	}
}
module.exports = ValidateView
