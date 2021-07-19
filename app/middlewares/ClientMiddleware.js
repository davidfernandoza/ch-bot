'use strict'

class ClientMiddleware {
	constructor({ ClientRepository, ValidateChat }) {
		this.validateChat = ValidateChat
		this.clientRepository = ClientRepository
	}

	// Si existe retorna True
	async clientExistValidate(CTX) {
		try {
			const telegramId = CTX.from.id
			return await this.clientExistByTelegramId(CTX, telegramId, false)
		} catch (error) {
			throw new Error(error)
		}
	}

	// Si no existe retorna True
	async clientNotExistValidate(CTX) {
		try {
			const telegramId = CTX.from.id
			return await this.clientExistByTelegramId(CTX, telegramId, true)
		} catch (error) {
			throw new Error(error)
		}
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
			throw new Error(error)
		}
	}

	async failResponse(CTX, fileType) {
		try {
			await this.validateChat[fileType](CTX)
			return false
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = ClientMiddleware
