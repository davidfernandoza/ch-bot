'use strict'

class ClientMiddleware {
	constructor({ ClientValidate }) {
		this.clientValidate = ClientValidate
	}

	// Si existe retorna True
	async clientExistValidate(CTX) {
		try {
			const telegramId = CTX.from.id
			return await this.clientValidate.clientExistByTelegramId(
				CTX,
				telegramId,
				false
			)
		} catch (error) {
			throw new Error(error)
		}
	}

	// Si no existe retorna True
	async clientNotExistValidate(CTX) {
		try {
			const telegramId = CTX.from.id
			return await this.clientValidate.clientExistByTelegramId(
				CTX,
				telegramId,
				true
			)
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = ClientMiddleware
