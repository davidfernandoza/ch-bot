'use strict'

class InfoMiddleware {
	constructor({ ValidateChat, ClientRepository }) {
		this.validateChat = ValidateChat
		this.clientRepository = ClientRepository
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
				return await this.sendError(CTX, client, 'country')
			} else if (!client.phone) {
				return await this.sendError(CTX, client, 'phone')
			} else if (!client.email) {
				return await this.sendError(CTX, client, 'email')
			} else if (!client.birthday) {
				return await this.sendError(CTX, client, 'birthday')
			} else {
				if (client.status == 'INFO') {
					client.status = 'ACTIVE'
					await this.clientRepository.updateClientInMongo()
				}
				return true
			}
		} catch (error) {
			throw new Error(error)
		}
	}

	async sendError(CTX, client, attribute) {
		try {
			if (client.status != 'INFO') {
				client.status = 'INFO'
				await this.clientRepository.updateClientInMongo(client)
			}
			await this.validateChat.infoIsMissing(CTX, attribute)
			return false
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = InfoMiddleware
