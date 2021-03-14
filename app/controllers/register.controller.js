'use strict'
// const Markup = require('telegraf/markup')
const Controller = require('./controller')
// const Keyboard = require('telegraf-keyboard')

class RegisterController extends Controller {
	constructor({
		Bot,
		Client,
		Config,
		Methods,
		MessageString,
		IsNotBotValidate
	}) {
		super(Config, Bot, IsNotBotValidate, MessageString, Methods)
		this.client = Client
	}

	/*
	 * Registro del cliente en el back
	 */
	async index(CTX) {
		const endPoint = 'clients'
		const { POST, GET } = this.methods
		const contextData = CTX.update.callback_query
		const sponsorTelegramId = CTX.sponsor_telegram_id
		const dataSponsor = await super.apiRequest(
			CTX,
			GET,
			`${endPoint}/telegram-id/${sponsorTelegramId}`
		)
		if (dataSponsor) {
			const client = contextData.from
			const dataSend = {
				telegram_id: client.id,
				sponsor_id: dataSponsor.id,
				full_name: `${client.first_name} ${client.last_name}`,
				username: `${client.username}`
			}

			const dataResponse = await super.apiRequest(CTX, POST, endPoint, dataSend)
			if (dataResponse) {
				this.client.create({
					...dataResponse,
					client_id: dataResponse.id,
					action_bot: 'GET_WALLET',
					sponsor_telegram_id: sponsorTelegramId
				})

				this.bot.telegram.sendMessage(
					client.id,
					`Se ha creado tu usuario con exito. \n Por favor ingresa tu direccion tron de donde enviaras el pago:`
				)
			}
		}
	}
}
module.exports = RegisterController
