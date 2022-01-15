'use strict'
const Sentry = require('@sentry/node')
const { v4: uuidv4 } = require('uuid')
const ClientErrorManager = require('./ClientErrorManager')

module.exports = class ErrorHandler {
	constructor({ MessageString, ApiErrorString, Config, ErrorDomain }) {
		this.config = Config
		this.messageString = MessageString
		this.apiErrorString = ApiErrorString
		this.clientErrorManager = new ClientErrorManager(ErrorDomain)
		Sentry.init({ dsn: this.config.SENTRY_DNS, tracesSampleRate: 0 })
	}

	async sendError(CTX, error) {
		const errorID = `BOT-${uuidv4()}`
		const env = this.config.NODE_ENV
		const errorObject = this.buildError(error, errorID)
		if (env != 'production') this.consoleLog(errorObject, 'BOT')

		if (error.response && error.config) {
			this.serverErrorHandler(CTX, env, error, errorID)
		} else {
			Sentry.captureMessage(errorID)
		}
		return CTX.reply(this.messageString.serverError)
	}

	serverErrorHandler(CTX, env, error, errorID) {
		const errorObject = this.buildErrorServer(error, errorID)
		if (this.clientErrorManager.openValidate(error, CTX)) {
			if (env != 'production') this.consoleLog(errorObject, 'BOT SERVER')
		} else if (env == 'production') {
			Sentry.captureMessage(errorID)
		} else this.consoleLog(errorObject, 'BOT SERVER')
	}

	apiErrorHandler(error, req, res, next) {
		let code = 'ERR500'
		const errorID = `API-${uuidv4()}`
		const errorObject = this.buildError(error, errorID)
		const env = this.config.NODE_ENV
		if (error.message.length === 6) code = error.message

		if (env == 'production') {
			Sentry.captureMessage(errorID)
		} else this.consoleLog(errorObject, 'API')

		res.status(this.apiErrorString[code].status).send(this.apiErrorString[code])
	}

	buildErrorServer(error, id) {
		const errorObject = {
			id: id,
			status: error.response.status,
			method: error.config.method,
			url: error.config.url,
			data_send: error.config.data,
			data_response: error.response.data,
			statusText: error.response.statusText,
			headers: error.config.headers
		}

		if (error.response.data.errors) {
			errorObject.data_response_errors = error.response.data.errors
		}
		return errorObject
	}
	buildError(error, id) {
		return {
			id: id,
			name: error.name,
			message: error.message,
			stack: error.stack
		}
	}

	consoleLog(error, type) {
		console.error(`START =================================== ${type}`)
		console.error(error)
		console.error(`END ===================================== ${type}`)
	}
}
