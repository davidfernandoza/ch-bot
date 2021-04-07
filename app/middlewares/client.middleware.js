'use strict'

class ClientMiddleware {
	constructor({ ClientValidate }) {
		this.clientValidate = ClientValidate
	}

	async clientExist(CTX) {
		const telegramId = CTX.from.id
		if (await this.clientValidate.clientExistByTelegramId(CTX, telegramId)) {
			return true
		}
		return false
	}
}
module.exports = ClientMiddleware
