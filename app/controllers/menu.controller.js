'use strict'
const Markup = require('telegraf/markup')
const Controller = require('./controller')
const { Keyboard } = require('telegram-keyboard')

class MenuController extends Controller {
	constructor({ Config, Bot, IsNotBotValidate, MessageString, Methods }) {
		super(Config, Bot, IsNotBotValidate, MessageString, Methods)
	}

	/*
	 * Registro del cliente en el back
	 */
	async index(CTX) {
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
