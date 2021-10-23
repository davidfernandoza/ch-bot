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
		try {
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
		} catch (error) {
			throw new Error(error)
		}
	}

	async setAccessToken(CTX) {
		try {
			const telegramId = CTX.from.id,
				accessToken = await this.authDomain.getAccessToken(telegramId)
			if (!accessToken) return false
			CTX.accessToken = accessToken
			return true
		} catch (error) {
			throw new Error(error)
		}
	}

	async isActiveClient(CTX, client) {
		try {
			let response = true,
				activesStatuses = ['ACTIVE', 'INFO_ACTIVE', 'INFO']
			if (activesStatuses.includes(client.status)) {
				if (
					moment(client.period).format('YYYY-MM-DD') <
					moment().format('YYYY-MM-DD')
				) {
					await this.statusClientDomain.addInactiveClient(client)
					await this.openTransaction(CTX, client)
					response = false
				}
			} else if (client.status == 'INCOMPLETE') {
				await this.openIncompleteMessage(CTX)
				response = false
			} else {
				await this.openTransaction(CTX, client)
				response = false
			}
			return response
		} catch (error) {
			throw new Error(error)
		}
	}

	async openTransaction(CTX, client) {
		try {
			return this.transactionDomain.openTransaction(CTX, client)
		} catch (error) {
			throw new Error(error)
		}
	}
	async openIncompleteMessage(CTX) {
		try {
			await this.validateChat.incompleteMessage(CTX)
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = AuthMiddleware
