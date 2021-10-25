'use strict'
const { Markup } = require('telegraf')

class StartChat {
	constructor({ MessageString, TermsAndPlandChat }) {
		this.messageString = MessageString
		this.termsAndPlandChat = TermsAndPlandChat
	}

	async sendTermAndPlan(CTX, dataPrint) {
		const message = this.makeMessageWithTermAndPlans(CTX),
			button = Markup.inlineKeyboard([
				Markup.button.callback(
					'✔️ Aceptar',
					`acceptTerms:${dataPrint.sponsorTelegramId}`
				)
			])
		await CTX.replyWithMarkdown(message)
		await this.termsAndPlandChat.printTerm(CTX, dataPrint)
		await this.termsAndPlandChat.printPlan(CTX, dataPrint)
		await this.termsAndPlandChat.printMatrix(CTX, dataPrint)
		return await CTX.replyWithMarkdown(this.messageString.acceptRules, button)
	}

	makeMessageWithTermAndPlans(CTX) {
		const message = this.messageString.registerRule
		return message.replace('#NAME', CTX.from.first_name)
	}
}
module.exports = StartChat
