'use strict'
const { Markup } = require('telegraf')

module.exports = class PaymentChat {
	constructor({ MessageString, DefaultString }) {
		this.messageString = MessageString
		this.defaultString = DefaultString
	}

	async printBalance(CTX, value) {
		const message = this.buildMessageForBalance(value)
		return await CTX.replyWithMarkdown(message)
	}

	async printBalanceWithPayPlan(CTX, value) {
		const message = this.buildMessageForBalance(value)
		const button = this.buildButtonForPayPlan()
		return await CTX.replyWithMarkdown(message, button)
	}

	async collectBalance(CTX, type) {
		const telegramId = CTX.from.id
		const url = this.defaultString.URL_SUPPORT
		let message = this.messageString[`collectBalance${type}`]
		message = message.replace('#TELEGRAM_ID', telegramId)
		message = message.replace('#URL_SUPPORT', url.replace('#', telegramId))
		return await CTX.replyWithMarkdown(message)
	}

	async validationPrintForCollectBalance(CTX, value) {
		const message = this.buildMessageForBalance(value)
		if (value > 0) {
			const button = this.buildButtonForCollectBalance()
			return await CTX.replyWithMarkdown(message, button)
		}
		return await CTX.replyWithMarkdown(message + ' no puedes cobrar todavía')
	}

	buildMessageForBalance(value) {
		let message = this.messageString.balanceMessage
		return message.replace('#BALANCE', value)
	}

	buildButtonForPayPlan() {
		return Markup.inlineKeyboard([
			Markup.button.callback(
				'💵 Pagar ciclo con saldo',
				`payAPlanWithBalance:none`
			)
		])
	}

	buildButtonForCollectBalance() {
		return Markup.inlineKeyboard([
			Markup.button.callback('💰 Cobrar saldo actual 💸', `collectBalance:none`)
		])
	}
}
