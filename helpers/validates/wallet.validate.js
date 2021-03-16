'use strict'
const validate = require('validate.js')
/*
 * Valida si el que abre el chat es un bot
 */
class WalletValidate {
	constructor({ Bot, MessageString }) {
		this.bot = Bot
		this.messageString = MessageString
		this.rules = {
			presence: true,
			address: { length: { is: 34 } }
		}
	}

	async index(CTX, Form) {
		if (await validate(Form, this.rules)) {
			this.bot.telegram.sendMessage(
				CTX.from.id,
				this.messageString.addresUnavalible
			)
			return false
		}
		return true
	}
}

module.exports = WalletValidate
