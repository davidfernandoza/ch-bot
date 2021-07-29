'use strict'

class InfoMiddleware {
	constructor({ ValidateChat, ClientRepository, StatusClientDomain }) {
		this.validateChat = ValidateChat
		this.clientRepository = ClientRepository
		this.statusClientDomain = StatusClientDomain
	}

	async infoExistValidate(CTX) {
		try {
			return await this.clientWithInfoValidate(CTX)
		} catch (error) {
			throw new Error(error)
		}
	}

	async clientWithInfoValidate(CTX) {
		try {
			const telegramId = CTX.from.id
			const client = await this.clientRepository.getClientByTelegramIdInMongo(
				telegramId
			)

			if (JSON.stringify(client.country) == '{}') {
				return await this.sendError(CTX, 'country')
			} else if (!client.phone) {
				return await this.sendError(CTX, 'phone')
			} else if (!client.email) {
				return await this.sendError(CTX, 'email')
			} else {
				if (client.status == 'INFO_ACTIVE') {
					await this.statusClientDomain.activeClient(client)
				}
				return true
			}
		} catch (error) {
			throw new Error(error)
		}
	}

	async clientIsInfo(CTX) {
		try {
			const telegramId = CTX.from.id
			const client = await this.clientRepository.getClientByTelegramIdInMongo(
				telegramId
			)
			if (JSON.stringify(client.country) == '{}') return false
			if (!client.phone) return false
			if (!client.email) return false
			if (client.status == 'INFO') {
				await this.validateChat.infoBackMissing(CTX)
				return false
			}
			return true
		} catch (error) {
			throw new Error(error)
		}
	}

	async clientIsActive(CTX) {
		try {
			const telegramId = CTX.from.id
			const client = await this.clientRepository.getClientByTelegramIdInMongo(
				telegramId
			)
			if (JSON.stringify(client.country) == '{}') return true
			if (!client.phone) return true
			if (!client.email) return true
			if (client.status == 'INFO_ACTIVE') {
				await this.statusClientDomain.activeClient(client)
			}
			return true
		} catch (error) {
			throw new Error(error)
		}
	}

	async sendError(CTX, attribute) {
		try {
			await this.validateChat.infoIsMissing(CTX, attribute)
			return false
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = InfoMiddleware
