'use strict'
const { Markup } = require('telegraf')

class TermPlanTrait {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async responseWithCard(CTX, dataPlan, dataTerm) {
		if (dataTerm && dataPlan) {
			/*
			 * Captura y asigna el patrocinador al cliente por la url del referido
			 */
			const arrayText = CTX.update.message.text.split(' '),
				sponsor_telegram_id = arrayText.length > 1 ? arrayText[1] : '1ROOT',
				buttons = Markup.inlineKeyboard([
					// boton en linea
					Markup.button.callback(
						'✔️ Aceptar',
						`acceptTerms:${sponsor_telegram_id}:${dataPlan.id}`
					)
				])

			let messageSend = this.messageString.registerRule
			messageSend = messageSend.replace('#NAME', CTX.from.first_name)
			messageSend = messageSend.replace('#TERM', dataTerm.description)
			messageSend = messageSend.replace('#PLAN', dataPlan.term.description)

			// Envio de mensaje a telegram con boto de aceptacion
			return await CTX.reply(messageSend, buttons)
		}
	}
}
module.exports = TermPlanTrait
