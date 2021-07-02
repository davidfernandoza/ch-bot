'use strict'

class TextHandler {
	constructor({
		ClientRepository,
		WalletController,
		MiddlewareKernel,
		ReferredLinkController,
		MenuController
	}) {
		this.clientRepository = ClientRepository
		this.middlewareKernel = MiddlewareKernel
		this.controllers = {
			WalletController,
			ReferredLinkController,
			MenuController
		}
	}
	/*
	 * Maneja el evento de texto enviado
	 */
	async getClientAction(CTX) {
		CTX.client = await this.clientRepository.getClientByTelegramIdInMongo(
			CTX.from.id
		)
		const action =
			CTX.client.action_bot.action != 'NONE'
				? CTX.client.action_bot.action
				: CTX.update.message.text

		if (CTX.client) {
			this.selectAction(CTX, action)
		}
	}

	selectAction(CTX, actionBot) {
		switch (actionBot) {
			case 'GET_WALLET':
				this.middlewareKernel.routerToMiddleware({
					middlewares: ['WalletMiddleware.correctWallet'],
					request: { context: CTX, value: null },
					next: () => this.controllers.WalletController.storeWallet(CTX)
				})
				break
			case '🤝 Link Referido':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'AuthMiddleware.isActive'
					],
					request: { context: CTX, value: null },
					next: () =>
						this.controllers.ReferredLinkController.senReferradLink(CTX)
				})
				break
			case '👨‍👧‍👦 Referidos':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'AuthMiddleware.isActive'
					],
					request: { context: CTX, value: null },
					next: () => this.controllers.MenuController.openReferralsMenu(CTX)
				})
				break
			case '💵 Cobrar':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'AuthMiddleware.isActive'
					],
					request: { context: CTX, value: null },
					next: () => this.controllers.MenuController.openChargeMenu(CTX)
				})
				break
			case '📆 Ciclo':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'AuthMiddleware.isActive'
					],
					request: { context: CTX, value: null },
					next: () => this.controllers.MenuController.openCycleMenu(CTX)
				})
				break
			case '⚖️ Reglas':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'AuthMiddleware.isActive'
					],
					request: { context: CTX, value: null },
					next: () => this.controllers.MenuController.openRulesMenu(CTX)
				})
				break
		}
	}
}
module.exports = TextHandler
