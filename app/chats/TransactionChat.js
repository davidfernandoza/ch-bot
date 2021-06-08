'use strict'

class TransactionChat {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async correctTransaction(CTX) {
		return await CTX.reply(this.messageString.correctTransaction)
	}
	async incorrectTransaction(CTX) {
		return await CTX.reply(this.messageString.incorrectTransaction)
	}
}
module.exports = TransactionChat
