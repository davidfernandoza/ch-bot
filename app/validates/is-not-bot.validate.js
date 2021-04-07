'use strict'
/*
 * Valida si el que abre el chat es un bot
 */
class IsNotBotValidate {
	constructor({ Bot, MessageString }) {
		this.bot = Bot
		this.messageString = MessageString
	}

	index(CTX) {
		if (CTX.from.is_bot) {
			this.bot.telegram.sendMessage(CTX.from.id, this.messageString.isBot)
			return false
		}
		return true
	}
}

module.exports = IsNotBotValidate
