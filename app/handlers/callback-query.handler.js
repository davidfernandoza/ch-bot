'use strict'

class CallbackQueryHandler {
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
		const buttonValueArray = CTX.update.callback_query.data.split(':'),
			button = buttonValueArray[0],
			value = buttonValueArray[1]

		switch (button) {
			case 'acceptTerms':
				CTX.sponsor_telegram_id = value
				CTX.plan_id = buttonValueArray[2]
				this.controllers.RegisterController.index(CTX)
				break
		}
	}
}
module.exports = CallbackQueryHandler
