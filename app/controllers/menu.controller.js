'use strict'
const { Markup } = require('telegraf')
const { Keyboard } = require('telegram-keyboard')

class MenuController {
	async openMenu(CTX) {
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
