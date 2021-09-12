'use strict'

class ErrorHandler {
	constructor({ MessageString, ApiErrorString }) {
		this.messageString = MessageString
		this.apiErrorString = ApiErrorString
	}

	async sendError(CTX, error) {
		console.log('====================================')
		console.log(error)
		console.log('====================================')
		return CTX.reply(this.messageString.serverError)
	}

	async api(error, req, res, next) {
		let code = 'ERR500'
		if (error.message.length === 6) {
			code = error.message
		}

		console.log('====================================')
		console.log(error.message)
		console.log('====================================')

		const status = this.apiErrorString[code].status
		res.status(status).send(this.apiErrorString[code])
	}
}
module.exports = ErrorHandler
