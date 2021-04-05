'use strict'

class StartController {
	constructor({
		ErrorHandler,
		TermRepository,
		PlanRepository,
		StartView,
		StartDomain
	}) {
		this.planRepository = PlanRepository
		this.termRepository = TermRepository
		this.startView = StartView
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
			const dataPrint = {
				dataTerm: await this.termRepository.getDefaultTerm(),
				dataPlan: await this.planRepository.getDefaultPlan(),
				sponsorTelegramId: this.startDomain.getSponsorTelegramId(CTX)
			}
			return this.startView.printInChat(CTX, dataPrint)
		} catch (error) {
			this.errorHandler.sendError(CTX, error)
		}
	}
}
module.exports = StartController
