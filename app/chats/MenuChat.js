'use strict'

class MenuChat {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async openMenu(CTX) {
		const buttons = Keyboard.reply(
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
		return await CTX.reply(buttons)
	}
}
module.exports = MenuChat
