'use strict'

class CommandHandler {
	constructor({
		MenuController,
		StartController,
		MiddlewareKernel,
		ClientRepository,
		DefaultController
	}) {
		this.middlewareKernel = MiddlewareKernel
		this.clientRepository = ClientRepository
		this.defaultController = DefaultController
		this.controllers = {
			MenuController,
			StartController
		}
	}

	/*
	 * Maneja el evento de texto enviado
	 */
	startBot(CTX) {
		this.middlewareKernel.routerToMiddleware({
			middlewares: ['ClientMiddleware.clientNotExistValidate'],
			request: { context: CTX },
			next: () => this.controllers.StartController.sendTermsAndPlans(CTX)
		})
	}

	async openMenu(CTX) {
		this.middlewareKernel.routerToMiddleware({
			middlewares: [
				'ClientMiddleware.clientExistValidate',
				'WalletMiddleware.clientWithWallet',
				'AuthMiddleware.isActive',
				'InfoMiddleware.infoExistValidate'
			],
			request: { context: CTX },
			next: () => this.controllers.MenuController.openMenu(CTX)
		})
	}

	async openCycleMenu(CTX) {
		this.middlewareKernel.routerToMiddleware({
			middlewares: [
				'ClientMiddleware.clientExistValidate',
				'WalletMiddleware.clientWithWallet'
			],
			request: { context: CTX },
			next: () => this.controllers.MenuController.openCycleMenu(CTX)
		})
	}
}
module.exports = CommandHandler
