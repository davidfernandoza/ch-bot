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
			this.bot.telegram.sendMessage(ctx.from.id, this.messageString.msgE001)
			return false
		}
		return true
	}
}

module.exports = IsNotBotValidate
