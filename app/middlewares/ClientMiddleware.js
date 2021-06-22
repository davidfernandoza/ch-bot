'use strict'

class ClientMiddleware {
	constructor({ ClientValidate }) {
		this.clientValidate = ClientValidate
	}

	// Si existe retorna True
	async clientExistValidate(CTX) {
		const telegramId = CTX.from.id
		return await this.clientValidate.clientExistByTelegramId(
			CTX,
			telegramId,
			false
		)
	}

	// Si no existe retorna True
	async clientNotExistValidate(CTX) {
		const telegramId = CTX.from.id
		return await this.clientValidate.clientExistByTelegramId(
			CTX,
			telegramId,
			true
		)
	}
}
module.exports = ClientMiddleware
