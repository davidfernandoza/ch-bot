'use strict'

class CommandHandler {
	constructor({ MenuController, StartController }) {
		this.controllers = {
			MenuController,
			StartController
		}
	}

	/*
	 * Maneja el evento de texto enviado
	 */
	startBot(CTX) {
		this.controllers.StartController.sendTermsAndPlans(CTX)
	}

	openMenu(CTX) {
		this.controllers.MenuController.sendMenu(CTX)
	}
}
module.exports = CommandHandler
