'use strict'

class CommandHandler {
	constructor({ MenuController, StartController, MiddlewareKernel }) {
		this.middlewareKernel = MiddlewareKernel
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
			middlewares: ['ClientMiddleware.clientExistValidate'],
			request: { context: CTX, value: null },
			next: () => this.controllers.StartController.sendTermsAndPlans(CTX)
		})
	}

	openMenu(CTX) {
		this.controllers.MenuController.sendMenu(CTX)
	}
}
module.exports = CommandHandler
