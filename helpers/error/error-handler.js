'use strict'

class ErrorHandler {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async sendError(CTX, error) {
		console.log('====================================')
		console.log(error)
		console.log('====================================')
		return CTX.reply(this.messageString.serverError)
	}
}
module.exports = ErrorHandler
