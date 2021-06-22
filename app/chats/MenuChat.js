'use strict'
const { Markup } = require('telegraf')
const { Keyboard, Key } = require('telegram-keyboard')
class MenuChat {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async openMenu(CTX) {
		await CTX.reply(
			'No ves el menu? Usa el siguiente boton.',
			this.getButtonInfoWebK()
		)
		const keyboard = Keyboard.make([
			[
				Key.callback('🤝 Link Referido', 'getLink'),
				Key.callback('👨‍👧‍👦 Referidos', 'getLink')
			],
			['📈 Balance', '💵 Cobrar'],
			['📆 Ciclo', '⚖️ Reglas']
		]).reply()

		return await CTX.reply('Hola de nuevo!', keyboard)
	}

	async sendWebKMessage(CTX) {
		return await CTX.replyWithMarkdown(this.messageString.webKvalidate)
	}

	getButtonOpenMenu() {
		return Markup.inlineKeyboard([
			Markup.button.callback('🔣 Abrir Menu', `openMenu:NONE`)
		])
	}

	getButtonInfoWebK() {
		return Markup.inlineKeyboard([
			Markup.button.callback('📚 Ver informacion!!', `openWebK:NONE`)
		])
	}
}
module.exports = MenuChat
