'use strict'

class StartController {
	constructor({
		ErrorHandler,
		TermRepository,
		PlanRepository,
		StartPresentation
	}) {
		this.planRepository = PlanRepository
		this.termRepository = TermRepository
		this.startPresentation = StartPresentation
		this.errorHandler = ErrorHandler
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
			const dataPrint = {
				dataTerm: await this.termRepository.getDefaultTerm(),
				dataPlan: await this.planRepository.getDefaultPlan(),
				sponsorTelegramId: this.getSponsorTelegramId(CTX)
			}
			return this.startPresentation.responseWithDataAndButton(CTX, dataPrint)
		} catch (error) {
			this.errorHandler.sendError(CTX, error)
		}
	}

	getSponsorTelegramId(CTX) {
		try {
			const arrayText = CTX.update.message.text.split(' ')
			return arrayText.length > 1 ? arrayText[1] : '1ROOT'
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = StartController
