'use strict'
const Controller = require('./controller')

class TermPlanController extends Controller {
	constructor({
		Config,
		Client,
		Methods,
		TermPlanTrait,
		DefaultString,
		MessageString,
		MenuController,
		IsNotBotValidate
	}) {
		super(Config, IsNotBotValidate, MessageString)
		this.defaultString = DefaultString
		this.menuController = MenuController
		this.methods = Methods
		this.client = Client
		this.termPlanTrait = TermPlanTrait
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
	async getPlanAndTerms(CTX) {
		/*
		 * Validacion de la existencia del cliente
		 */
		if (await this.client.findOne({ telegram_id: CTX.from.id })) {
			return this.menuController.index(CTX)
		}

		// Peticion del plan, terminos y condiciones generales
		const dataTerm = await this.getTerm(CTX, this.defaultString.GENERAL_TERM)
		const dataPlan = await this.getPlan(CTX, this.defaultString.DEFAULT_PLAN)
		return this.termPlanTrait.responseWithCard(CTX, dataPlan, dataTerm)
	}

	async getPlan(CTX, idPlan) {
		const { GET } = this.methods,
			request = {
				endpoint: `plans/${idPlan}`,
				context: CTX,
				method: GET
			}
		return await super.apiRequest(request)
	}

	async getTerm(CTX, idTerm) {
		const { GET } = this.methods,
			requestTerm = {
				endpoint: `terms/${idTerm}`,
				context: CTX,
				method: GET
			}
		return await super.apiRequest(requestTerm)
	}
}
module.exports = TermPlanController
