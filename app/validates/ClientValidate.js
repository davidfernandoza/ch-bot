'use strict'
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
			this.errorHandler.sendError(error)
			return false
		}
	}

	async failResponse(CTX, fileType) {
		await this.validateChat[fileType](CTX)
		await this.menuController.openMenu(CTX)
		return false
	}
}

module.exports = ClientValidate
