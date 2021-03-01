'use strict'
const ngrok = require('ngrok')

class UrlBotService {
	constructor({ Config }) {
		this.config = Config
	}

	// Retorna la url en que esta corriendo la app para el registro del bot
	async get() {
		if (this.config.NODE_ENV != 'production') {
			await ngrok.authtoken(this.config.TOKEN_BRIDGE)
			return await ngrok.connect(this.config.PORT)
		} else {
			return this.config.ORIGIN
		}
	}
}

module.exports = UrlBotService
