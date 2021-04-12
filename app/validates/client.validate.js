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
			if (isExist && response) {
				// Error si el cliente existe
				this.validateChat.clientExist(CTX)
				this.menuController.openMenu(CTX)
				return false
			} else if (!isExist && !response) {
				// Error si el cliente no existe
				this.validateChat.clientNotExist(CTX)
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
