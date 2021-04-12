'use strict'

class TextHandler {
	constructor({ ClientRepository, WalletController, MiddlewareKernel }) {
		this.clientRepository = ClientRepository
		this.middlewareKernel = MiddlewareKernel
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
				this.middlewareKernel.routerToMiddleware({
					middlewares: ['WalletMiddleware.correctWallet'],
					request: { context: CTX, value: null },
					next: () => this.controllers.WalletController.storeWallet(CTX)
				})
				break
		}
	}
}
module.exports = TextHandler
