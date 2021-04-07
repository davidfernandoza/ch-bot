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

	async clientExistByTelegramId(CTX, telegramId) {
		try {
			const response = await this.clientRepository.getClientByTelegramIdInMongo(
				telegramId
			)
			if (!response) {
				this.validateChat.clientExist(CTX)
				this.menuController.openMenu(CTX)
				return false
			}
			return true
		} catch (error) {
			this.errorHandler.sendError(error)
			return false
		}
	}
}

module.exports = ClientValidate
