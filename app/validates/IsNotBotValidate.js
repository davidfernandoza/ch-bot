'use strict'
/*
 * Valida si el que abre el chat es un bot
 */
class IsNotBotValidate {
	constructor({ ValidateChat }) {
		this.validateChat = ValidateChat
	}

	async IsBotError(CTX) {
		if (CTX.from.is_bot) {
			await this.validateChat.chatIsBot(CTX)
			return false
		}
		return true
	}
}

module.exports = IsNotBotValidate
