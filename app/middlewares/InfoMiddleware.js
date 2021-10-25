'use strict'

class InfoMiddleware {
	constructor({ ValidateChat, ClientRepository, StatusClientDomain }) {
		this.validateChat = ValidateChat
		this.clientRepository = ClientRepository
		this.statusClientDomain = StatusClientDomain
	}

	async infoExistValidate(CTX) {
		return await this.clientWithInfoValidate(CTX)
	}

	async clientWithInfoValidate(CTX) {
		const telegramId = CTX.from.id
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			telegramId
		)

		if (JSON.stringify(client.country) == '{}') {
			return await this.sendError(CTX, 'country')
		} else if (!client.phone) {
			return await this.sendError(CTX, 'phone')
		} else {
			if (client.status == 'INFO_ACTIVE') {
				await this.statusClientDomain.addActiveClient(client)
			}
			return true
		}
	}

	async clientIsInfo(CTX) {
		const telegramId = CTX.from.id
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			telegramId
		)
		if (JSON.stringify(client.country) == '{}') return false
		if (!client.phone) return false
		if (client.status == 'INFO') {
			await this.validateChat.infoBackMissing(CTX)
			return false
		}
		return true
	}

	async clientIsActive(CTX) {
		const telegramId = CTX.from.id
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			telegramId
		)
		if (JSON.stringify(client.country) == '{}') return true
		if (!client.phone) return true
		if (client.status == 'INFO_ACTIVE') {
			await this.statusClientDomain.addActiveClient(client)
		}
		return true
	}

	async sendError(CTX, attribute) {
		await this.validateChat.infoIsMissing(CTX, attribute)
		return false
	}
}
module.exports = InfoMiddleware
