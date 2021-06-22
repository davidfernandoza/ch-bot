'use strict'
const moment = require('moment')

class AuthMiddleware {
	constructor({ ClientValidate, ClientRepository, AuthRepository }) {
		this.clientValidate = ClientValidate
		this.clientRepository = ClientRepository
		this.authRepository = AuthRepository
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
		const telegramId = CTX.from.id,
			client = await this.clientRepository.getClientByTelegramIdInMongo(
				telegramId
			)

		if (
			moment(client.auth.expires_in).format('YYYY-MM-DD') <
			moment().format('YYYY-MM-DD')
		) {
			client.auth = await this.authRepository.refresh(client.auth.auth_token)
			client = await this.clientRepository.updateClientInMongo(client)
		}
		CTX.accessToken = client.auth.access_token
	}
}
module.exports = AuthMiddleware
