'use strict'

class ClientMiddleware {
	constructor({ ClientValidate }) {
		this.clientValidate = ClientValidate
	}

	async clientExistValidate(CTX) {
		const telegramId = CTX.from.id
		if (
			await this.clientValidate.clientExistByTelegramId(CTX, telegramId, true)
		)
			return true
		return false
	}

	async clientNotExistValidate(CTX) {
		const telegramId = CTX.from.id
		if (
			await this.clientValidate.clientExistByTelegramId(CTX, telegramId, false)
		)
			return true
		return false
	}
}
module.exports = ClientMiddleware
