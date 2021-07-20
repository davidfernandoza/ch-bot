'use strict'

const moment = require('moment')
class AuthMiddleware {
	constructor({ ClientRepository, AuthDomain, ValidateChat }) {
		this.clientRepository = ClientRepository
		this.authDomain = AuthDomain
		this.validateChat = ValidateChat
	}

	async isActive(CTX) {
		try {
			const client = await this.clientRepository.getClientByTelegramIdInMongo(
				CTX.from.id
			)
			if (await this.isActiveClient(CTX, client)) {
				if (!(await this.setAccessToken(CTX))) {
					await this.openPayment(CTX, client)
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
			let response = true
			if (client.status == 'ACTIVE' || client.status == 'INFO') {
				if (
					moment(client.period).format('YYYY-MM-DD') <
					moment().format('YYYY-MM-DD')
				) {
					response = await this.updateStatusClient(CTX, client)
				}
			} else {
				await this.openPayment(CTX, client)
				response = false
			}
			return response
		} catch (error) {
			throw new Error(error)
		}
	}

	async updateStatusClient(CTX, client) {
		try {
			client.status = 'DEBT'
			client = await this.clientRepository.updateClientInMongo(client)
			await this.openPayment(CTX, client)
			return false
		} catch (error) {
			throw new Error(error)
		}
	}

	async openPayment(CTX, client) {
		try {
			await this.validateChat.openPayment(CTX, client)
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = AuthMiddleware
