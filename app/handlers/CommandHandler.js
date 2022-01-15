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
			middlewares: [
				'ClientMiddleware.clientNotExistValidate',
				'StartMiddleware.sponsorIdValidate'
			],
			request: { context: CTX },
			next: () => this.controllers.StartController.setSponsorId(CTX)
		})
	}

	async openMenu(CTX) {
		this.middlewareKernel.routerToMiddleware({
			middlewares: [
				'ClientMiddleware.clientExistValidate',
				'ClientMiddleware.clientIsCompany',
				'WalletMiddleware.clientWithWallet',
				'InfoMiddleware.infoExistValidate',
				'ClientMiddleware.inactiveClient'
			],
			request: { context: CTX },
			next: () => this.controllers.MenuController.openMenu(CTX)
		})
	}

	async openCycleMenu(CTX) {
		this.middlewareKernel.routerToMiddleware({
			middlewares: [
				'ClientMiddleware.clientExistValidate',
				'ClientMiddleware.clientIsCompany',
				'WalletMiddleware.clientWithWallet'
			],
			request: { context: CTX },
			next: () => this.controllers.MenuController.openCycleMenu(CTX)
		})
	}
}
module.exports = CommandHandler
