'use strict'
class AuthMiddleware {
	constructor({ ClientValidate, ClientRepository, AuthDomain }) {
		this.clientValidate = ClientValidate
		this.clientRepository = ClientRepository
		this.authDomain = AuthDomain
	}

	async isActive(CTX) {
		try {
			const telegramId = CTX.from.id
			if (await this.clientValidate.isActive(CTX, telegramId)) {
				await this.setAccessToken(CTX)
				return true
			}
			return false
		} catch (error) {
			throw new Error(error)
		}
	}

	async setAccessToken(CTX) {
		try {
			const telegramId = CTX.from.id
			CTX.accessToken = await this.authDomain.getAccessToken(telegramId)
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = AuthMiddleware
