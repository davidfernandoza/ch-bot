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
		const { POST, GET } = this.methods
		const contextData = CTX.update.callback_query
		const dataSponsor = await super.apiRequest(
			CTX,
			GET,
			`${endPoint}/get-sponsor/${CTX.sponsor_telegram_id}`
		)
		if (dataSponsor) {
			const client = contextData.from
			console.log(client)
			const dataSend = {
				telegram_id: client.id,
				sponsor_id: dataSponsor.id,
				full_name: `${client.first_name} ${client.last_name}`,
				username: `${client.username}`
			}

			const dataResponse = await super.apiRequest(CTX, POST, endPoint, dataSend)
			if (dataResponse) {
				this.bot.telegram.sendMessage(
					client.id,
					`Su patrocinador es ${dataSponsor.full_name}`
				)
			}
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
