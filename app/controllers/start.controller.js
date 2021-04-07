'use strict'

class StartController {
	constructor({ ErrorHandler, StartChat, StartDomain }) {
		this.startChat = StartChat
		this.errorHandler = ErrorHandler
		this.startDomain = StartDomain
	}

	/*
	 * Inicializar el chat con el cliente enviandole terminos y condiciones
	 *
	 * Por medio de la url de patrocinio que se envian entre clientes se genera
	 * el boton con el codigo del patrocinador para asignarlo al cliente nuevo,
	 * posterior mente en el registro
	 *
	 * Cada cliente tiene una url unica que ayuda a destinguirlos
	 */
	async sendTermsAndPlans(CTX) {
		try {
			const dataPrint = await this.startDomain.makeDataPrint(CTX)
			return this.startChat.printInChat(CTX, dataPrint)
		} catch (error) {
			this.errorHandler.sendError(CTX, error)
		}
	}
}
module.exports = StartController
