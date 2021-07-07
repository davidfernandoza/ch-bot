'use strict'
class InfoValidate {
	constructor({ ErrorHandler, ClientRepository, ValidateChat }) {
		this.errorHandler = ErrorHandler
		this.validateChat = ValidateChat
		this.clientRepository = ClientRepository
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
			this.errorHandler.sendError(CTX, error)
			return false
		}
	}

	async sendError(CTX, client, attribute) {
		if (client.status != 'INFO') {
			client.status = 'INFO'
			await this.clientRepository.updateClientInMongo(client)
		}
		await this.validateChat.infoIsMissing(CTX, attribute)
		return false
	}
}

module.exports = InfoValidate
