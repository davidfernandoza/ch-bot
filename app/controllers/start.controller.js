'use strict'
const markup = require('telegraf/markup')
const Controller = require('./controller')

class StartController extends Controller {
	constructor({
		Bot,
		Config,
		Methods,
		TermsString,
		MessageString,
		MenuController,
		IsNotBotValidate
	}) {
		super(Config, Bot, IsNotBotValidate, MessageString, Methods)
		this.termsString = TermsString
		this.menuController = MenuController
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
		const { GET } = this.methods
		const client = CTX.update.message.from
		if (await super.apiRequest(CTX, GET, `clients/telegram-id/${client.id}`)) {
			return this.menuController.index(CTX)
			// this.bot.telegram.sendMessage(CTX.from.id, '/menu')
		} else {
			/*
			 *  Peticion de los terminos y condiciones generales
			 */
			const dataResponse = await super.apiRequest(
				CTX,
				GET,
				`terms/${this.termsString.GENERAL_TERM}`
			)

			if (dataResponse) {
				/*
				 * Captura y asigna el patrocinador al cliente
				 */
				const arrayText = CTX.update.message.text.split(' ')
				const sponsor_telegram_id =
					arrayText.length > 1 ? arrayText[1] : '1ROOT'

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
				messageSend = messageSend.replace('#RULES', dataResponse.description)

				// Envio de mensaje a telegram
				this.bot.telegram.sendMessage(CTX.from.id, messageSend, replyOptions)
			}
		}
	}
}
module.exports = StartController
