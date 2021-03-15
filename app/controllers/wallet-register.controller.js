'use strict'

const Controller = require('./controller')
class WalletRegisterController extends Controller {
	constructor({
		Bot,
		Config,
		Client,
		Methods,
		MessageString,
		WalletValidate,
		IsNotBotValidate
	}) {
		super(Config, Bot, IsNotBotValidate, MessageString)
		this.walletValidate = WalletValidate
		this.methods = Methods
		this.client = Client
	}

	/*
	 * Registro de la billetera del cliente en el back
	 */
	async index(CTX) {
		/*
		 * Validacion de la direccion
		 */
		const address = CTX.message.text
		if (await this.walletValidate.index(CTX, { address })) {
			const { POST } = this.methods,
				client = CTX.client,
				dataSend = { address: address, client_id: client.client_id },
				request = {
					endpoint: 'wallets',
					context: CTX,
					method: POST
				},
				dataResponse = await super.apiRequest(request, dataSend)

			console.log(dataResponse)

			// Validacion de billetera creada correctamente
			if (dataResponse) {
				const payment = dataResponse.payment
				this.client.where({ telegram_id: CTX.from.id }).update({
					wallet: { ...payment }
				})

				// const replyOptions = markup
				// 	.inlineKeyboard([
				// 		markup.callbackButton(
				// 			'✔️ Aceptar',
				// 			`acceptTerms:${sponsor_telegram_id}`
				// 		)
				// 	])
				// 	.extra()

				// this.bot.telegram.sendMessage(
				// 	client.id,
				// 	`Se ha agregado la direccion ${CTX.text} a tu usuario. \n `
				// )
			}
		}
	}
}
module.exports = WalletRegisterController
