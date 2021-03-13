'use strict'

class HandlerText {
	constructor({ Bot, Config, RegisterController }) {
		this.bot = Bot
		this.config = Config
		this.controllers = {
			RegisterController
		}
	}
	/*
	 * Captura el evento del boton en linea presionado
	 */
	index(CTX) {
		const buttonValueArray = CTX.update.callback_query.data.split(':')
		const button = buttonValueArray[0]
		const value = buttonValueArray[1]
		let controller = ''

		if (button == 'acceptTerms') {
			CTX.sponsor_telegram_id = value
			controller = 'RegisterController'
		}

		if (controller != '') {
			this.controllers[controller].index(CTX)
		}
	}
}
module.exports = HandlerText
