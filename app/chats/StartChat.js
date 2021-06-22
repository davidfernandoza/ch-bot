'use strict'
const { Markup } = require('telegraf')

class StartChat {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async sendTermAndPlan(CTX, dataPrint) {
		try {
			const message = this.makeMessageWithTermAndPlans(CTX, dataPrint),
				button = Markup.inlineKeyboard([
					Markup.button.callback(
						'✔️ Aceptar',
						`acceptTerms:${dataPrint.sponsorTelegramId}`
					)
				])
			return await CTX.replyWithMarkdown(message, button)
		} catch (error) {
			throw new Error(error)
		}
	}

	makeMessageWithTermAndPlans(CTX, dataPrint) {
		try {
			let message = this.messageString.registerRule
			message = message.replace('#NAME', CTX.from.first_name)
			message = message.replace('#TERM', dataPrint.dataTerm.description)
			message = message.replace('#PLAN', dataPrint.dataPlan.term.description)
			return message
		} catch (error) {
			throw new Error(error)
		}
	}

	getButtonNewClient() {
		return Markup.inlineKeyboard([
			Markup.button.callback('🤵 Crear Nuevo Usuario', `newClient:NONE`)
		])
	}
}
module.exports = StartChat
