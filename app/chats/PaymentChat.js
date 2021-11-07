'use strict'
const { Markup } = require('telegraf')

module.exports = class PaymentChat {
	constructor({ MessageString }) {
		this.messageString = MessageString
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
}
