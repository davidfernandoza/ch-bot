'use strict'

class TextHandler {
	constructor({ ClientRepository, WalletController }) {
		this.clientRepository = ClientRepository
		this.controllers = {
			WalletController
		}
	}
	/*
	 * Maneja el evento de texto enviado
	 */
	async getClientAction(CTX) {
		CTX.client = await this.clientRepository.getClientByTelegramIdInMongo(
			CTX.from.id
		)
		if (CTX.client) {
			this.selectAction(CTX, CTX.client.action_bot)
		}
	}

	selectAction(CTX, actionBot) {
		switch (actionBot.action) {
			case 'GET_WALLET':
				this.controllers.WalletController.storeWallet(CTX)
				break
		}
	}
}
module.exports = TextHandler
