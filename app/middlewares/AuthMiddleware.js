'use strict'
class AuthMiddleware {
	constructor({ ClientValidate, ClientRepository, AuthDomain }) {
		this.clientValidate = ClientValidate
		this.clientRepository = ClientRepository
		this.authDomain = AuthDomain
	}

	async isActive(CTX) {
		const telegramId = CTX.from.id
		if (await this.clientValidate.isActive(CTX, telegramId)) {
			await this.setAccessToken(CTX)
			return true
		}
		return false
	}

	async setAccessToken(CTX) {
		const telegramId = CTX.from.id
		CTX.accessToken = await this.authDomain.getAccessToken(telegramId)
	}
}
module.exports = AuthMiddleware
