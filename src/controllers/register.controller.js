'use strict'
// const Markup = require('telegraf/markup')
const Controller = require('./controller')
// const Keyboard = require('telegraf-keyboard')

class RegisterController extends Controller {
	constructor({ Config, Bot, IsNotBotValidate, MessageString, Methods }) {
		super(Config, Bot, IsNotBotValidate, MessageString, Methods)
	}

	/*
	 * Registro del cliente en el back
	 */
	async index(CTX) {
		const endPoint = 'clients'
		const { POST } = this.methods
		const from = CTX.from
		const dataSend = {
			telegram_id: from.id,
			sponsor_telegram_id: CTX.sponsor_telegram_id,
			full_name: `${from.first_name} ${from.last_name}`,
			username: `${from.username}`
		}

		// Peticion get a la api
		const dataResponse = await super.apiRequest(CTX, POST, endPoint, dataSend)
		if (dataResponse != null) {
			this.bot.telegram.sendMessage(
				from.id,
				`Su patrocinador es ${CTX.sponsor_telegram_id}`
			)
		}
	}
}
module.exports = RegisterController

// const replyOptions = Markup.inlineKeyboard([
// 	Markup.payButton('💸 Buy'),
// 	Markup.urlButton('❤️', 'http://telegraf.js.org')
// ]).extra()
// bot.command('/start', ctx => {
// 	const options = {
// 		inline: false, // default
// 		duplicates: false, // default
// 		newline: false // default
// 	}
// 	const keyboard = new Keyboard(options)
// 	keyboard
// 		.add('🤝 Link Referido', '👨‍👧‍👦 Referidos')
// 		.add('📈 Balance', '💵 Cobrar')
// 		.add('📆 Ciclo', '⚖️ Reglas')
// 		.add('🔙 Atras')
// 	ctx.reply('Keyboard', keyboard.draw())
// })
// context => {
// 	const idUser = context.from.id
// 	bot.telegram.sendMessage(idUser, 'mi amor es hermosa')
// })
// bot.comman
