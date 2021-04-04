'use strict'
const { Markup } = require('telegraf')

class StartPresentation {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	responseWithDataAndButton(CTX, dataPrint) {
		const message = this.makeMessageWithTermAndPlans(CTX, dataPrint)
		if (!message) {
			return super.errorHandler(CTX, responseWithDataAndButton.name)
		}
		const button = Markup.inlineKeyboard([
			Markup.button.callback(
				'✔️ Aceptar',
				`acceptTerms:${dataPrint.sponsorTelegramId}`
			)
		])
		return CTX.reply(message, button)
	}

	makeMessageWithTermAndPlans(CTX, dataPrint) {
		if (!dataPrint.dataTerm || !dataPrint.dataPlan) {
			return null
		}
		let message = this.messageString.registerRule
		message = message.replace('#NAME', CTX.from.first_name)
		message = message.replace('#TERM', dataPrint.dataTerm.description)
		message = message.replace('#PLAN', dataPrint.dataPlan.term.description)
		return message
	}
}
module.exports = StartPresentation
