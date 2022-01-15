'use strict'

const moment = require('moment')
class AuthMiddleware {
	constructor({
		ClientRepository,
		StatusClientDomain,
		AuthDomain,
		ValidateChat,
		TransactionDomain
	}) {
		this.clientRepository = ClientRepository
		this.authDomain = AuthDomain
		this.validateChat = ValidateChat
		this.statusClientDomain = StatusClientDomain
		this.transactionDomain = TransactionDomain
	}

	async isActive(CTX) {
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			CTX.from.id
		)
		if (await this.isActiveClient(CTX, client)) {
			if (!(await this.setAccessToken(CTX))) {
				await this.openTransaction(CTX, client)
				return false
			}
			return true
		}
		return false
	}

	async setAccessToken(CTX) {
		const telegramId = CTX.from.id,
			accessToken = await this.authDomain.getAccessToken(telegramId)
		if (!accessToken) return false
		CTX.accessToken = accessToken
		return true
	}

	async isActiveClient(CTX, client) {
		let response = true,
			activesStatuses = ['ACTIVE', 'INFO_ACTIVE', 'INFO']
		if (!activesStatuses.includes(client.status)) {
			await this.openTransaction(CTX, client)
			response = false
		}
		return response
	}

	async openTransaction(CTX, client) {
		return this.transactionDomain.openTransaction(CTX, client)
	}
}
module.exports = AuthMiddleware
