'use strict'
const { Markup } = require('telegraf')
const { Keyboard } = require('telegram-keyboard')

class MenuController {
	constructor({ Config, IsNotBotValidate, MessageString, Methods }) {
		// super(Config, IsNotBotValidate, MessageString, Methods)
	}

	/*
	 * Registro del cliente en el back
	 */
	async sendMenu(CTX) {
		return CTX.reply(
			'Hola ',
			Keyboard.reply(
				[
					'🤝 Link Referido',
					'👨‍👧‍👦 Referidos',
					'📈 Balance',
					'💵 Cobrar',
					'📆 Ciclo',
					'⚖️ Reglas',
					'🔙 Atras'
				],
				{ columns: 2 }
			)
		)
	}
}
module.exports = MenuController
