'use strict'
const Controller = require('./controller')

class RegisterController extends Controller {
	constructor({
		Bot,
		Client,
		Config,
		Methods,
		MessageString,
		IsNotBotValidate
	}) {
		super(Config, Bot, IsNotBotValidate, MessageString)
		this.client = Client
		this.methods = Methods
	}

	/*
	 * Registro del cliente en el back
	 */
	async index(CTX) {
		const endpoint = 'clients',
			{ POST, GET } = this.methods,
			contextData = CTX.update.callback_query,
			sponsorTelegramId = CTX.sponsor_telegram_id,
			planId = CTX.plan_id,
			request = {
				endpoint: `${endpoint}/telegram-id/${sponsorTelegramId}`,
				method: GET,
				context: CTX
			},
			dataSponsor = await super.apiRequest(request) // Trae al sponsor

		if (dataSponsor) {
			request.endpoint = endpoint
			request.method = POST

			// Crea al cliente
			const client = contextData.from,
				dataSend = {
					telegram_id: client.id,
					sponsor_id: dataSponsor.id,
					full_name: `${client.first_name} ${client.last_name}`,
					username: `${client.username}`,
					plan_id: planId
				},
				dataResponse = await super.apiRequest(request, dataSend)

			if (dataResponse) {
				/*
				 * Almacena al usuario en Mongo
				 */
				this.client.create({
					...dataResponse,
					client_id: dataResponse.id,
					action_bot: { action: 'GET_WALLET' },
					sponsor_telegram_id: sponsorTelegramId
				})

				const messageSend = this.messageString.succesClient
				this.bot.telegram.sendMessage(client.id, messageSend)
			}
		}
	}
}
module.exports = RegisterController
