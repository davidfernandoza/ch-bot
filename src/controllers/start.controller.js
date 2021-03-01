'use strict'
const markup = require('telegraf/markup')
const Controller = require('./controller')

class StartController extends Controller {
	constructor({ Config, Bot, MessageString, IsNotBotValidate, Methods }) {
		super(Config, Bot, IsNotBotValidate, MessageString, Methods)
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
		 *  Peticion get a la api
		 */
		const endPoint = 'terms/general'
		const dataResponse = await super.apiRequest(CTX, GET, endPoint)
		if (dataResponse != null) {
			/*
			 * Captura y asigna el patrocinador al cliente
			 */
			const arrayText = CTX.update.message.text.split(' ')
			const sponsor_telegram_id = arrayText.length > 1 ? arrayText[1] : '1ROOT'

			// Boton en linea
			const replyOptions = markup
				.inlineKeyboard([
					markup.callbackButton(
						'✔️ Aceptar',
						`acceptTerms:${sponsor_telegram_id}`
					)
				])
				.extra()

			let messageSend = this.messageString.msgI001
			messageSend = messageSend.replace('#NAME', CTX.from.first_name)
			messageSend = messageSend.replace('#RULES', dataResponse.payload.details)

			// Envio de mensaje a telegram
			this.bot.telegram.sendMessage(CTX.from.id, messageSend, replyOptions)
		}
	}
}
module.exports = StartController
