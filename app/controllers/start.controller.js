'use strict'
const markup = require('telegraf/markup')
const Controller = require('./controller')

class StartController extends Controller {
	constructor({
		Bot,
		Config,
		Client,
		Methods,
		TermsString,
		MessageString,
		MenuController,
		IsNotBotValidate
	}) {
		super(Config, Bot, IsNotBotValidate, MessageString)
		this.termsString = TermsString
		this.menuController = MenuController
		this.methods = Methods
		this.client = Client
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
	async index(CTX) {
		/*
		 * Validacion de la existencia del cliente
		 */
		const { GET } = this.methods,
			client = await this.client.find({ telegram_id: CTX.from.id })
		if (client.length > 0) return this.menuController.index(CTX)

		// Peticion de los terminos y condiciones generales
		const request = {
				endpoint: `terms/${this.termsString.GENERAL_TERM}`,
				context: CTX,
				method: GET
			},
			dataResponse = await super.apiRequest(request)

		if (dataResponse) {
			/*
			 * Captura y asigna el patrocinador al cliente por la url del referido
			 */
			const arrayText = CTX.update.message.text.split(' '),
				sponsor_telegram_id = arrayText.length > 1 ? arrayText[1] : '1ROOT'

			// Boton en linea
			const replyOptions = markup
				.inlineKeyboard([
					markup.callbackButton(
						'✔️ Aceptar',
						`acceptTerms:${sponsor_telegram_id}`
					)
				])
				.extra()

			let messageSend = this.messageString.msgIS001
			messageSend = messageSend.replace('#NAME', CTX.from.first_name)
			messageSend = messageSend.replace('#RULES', dataResponse.description)

			// Envio de mensaje a telegram
			this.bot.telegram.sendMessage(CTX.from.id, messageSend, replyOptions)
		}
	}
}
module.exports = StartController
