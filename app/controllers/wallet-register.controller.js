'use strict'

const Controller = require('./controller')
var QRCode = require('qrcode')
const markup = require('telegraf/markup')
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
				await this.client.where({ telegram_id: CTX.from.id }).updateOne({
					wallet: { ...dataResponse.payment },
					action_bot: { step: 0, action: 'NONE' }
				})

				const replyOptions = markup
					.inlineKeyboard([
						markup.callbackButton('✔️ Validar Pago', `paymentValidate`),
						markup.callbackButton('✔️ Cambiar direccion tron', `changeWallet`)
					])
					.extra()

				QRCode.toDataURL(dataResponse.consignment.address, (err, url) => {
					console.log(url)

					let message = this.messageString.sendWalletConsignment
					message = message.replace(
						'#AMOUNT',
						dataResponse.plan.consignment_value
					)
					message = message.replace(
						'#ADDRESS',
						dataResponse.consignment.address
					)
					this.bot.telegram.sendPhoto(CTX.from.id, url, 'Telegram Logo')
					this.bot.telegram.sendMessage(CTX.from.id, message, replyOptions)
				})
			}
		}
	}
}
module.exports = WalletRegisterController
