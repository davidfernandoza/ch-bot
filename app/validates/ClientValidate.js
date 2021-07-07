'use strict'
const moment = require('moment')
class ClientValidate {
	constructor({
		ClientRepository,
		ValidateChat,
		ErrorHandler,
		MenuController
	}) {
		this.clientRepository = ClientRepository
		this.validateChat = ValidateChat
		this.errorHandler = ErrorHandler
		this.menuController = MenuController
	}

	async clientExistByTelegramId(CTX, telegramId, isExist) {
		try {
			const response = await this.clientRepository.getClientByTelegramIdInMongo(
				telegramId
			)
			if (isExist && response)
				return await this.failResponse(CTX, 'clientExist')
			else if (!isExist && !response)
				return await this.failResponse(CTX, 'clientNotExist')
			return true
		} catch (error) {
			await this.errorHandler.sendError(CTX, error)
			return false
		}
	}

	async isActive(CTX, telegramId) {
		try {
			const client = await this.clientRepository.getClientByTelegramIdInMongo(
				telegramId
			)

			let response = true
			if (client.status == 'ACTIVE' || client.status == 'INFO') {
				if (
					moment(client.period).format('YYYY-MM-DD') <
					moment().format('YYYY-MM-DD')
				) {
					response = await this.updateStatusClient(CTX, client)
				}
			} else response = await this.updateStatusClient(CTX, client)
			return response
		} catch (error) {
			await this.errorHandler.sendError(CTX, error)
			return false
		}
	}

	async updateStatusClient(CTX, client) {
		client.status = 'DEBT'
		client = await this.clientRepository.updateClientInMongo(client)
		await this.validateChat.openPayment(CTX, client)
		return false
	}

	async failResponse(CTX, fileType) {
		await this.validateChat[fileType](CTX)
		return false
	}
}

module.exports = ClientValidate
