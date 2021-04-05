'use strict'
const { Markup } = require('telegraf')

class WalletTrait {
	constructor({ QrCode, Client, MessageString, Methods }) {
		this.client = Client
		this.qrCode = QrCode
		this.messageString = MessageString
		this.methods = Methods
	}

	// Responde con la direccion en qr
	async responseWithQR(CTX, dataResponse) {
		/*
		 * Validacion de billetera creada correctamente
		 * Almacenar billetera en mongo y cambio de accion para texto
		 */
		if (dataResponse) {
			// await this.client.where({ telegram_id: CTX.from.id }).updateOne({
			// 	wallet: { ...dataResponse.payment },
			// 	action_bot: { step: 0, action: 'NONE' }
			// })
			const { PUT } = this.methods,
				qrFile = await this.qrCode.generate(dataResponse.consignment.address),
				buttons = Markup.inlineKeyboard([
					Markup.button.callback(
						'✔️ Validar consignación',
						`consignmentValidate:NONE`
					),
					Markup.button.callback(
						'✔️ Cambiar direccion tron',
						`changeWallet:${PUT}`
					)
				])

			let message = this.messageString.sendWalletConsignment
			message = message.replace('#AMOUNT', dataResponse.plan.consignment_value)
			message = message.replace('#KEY', dataResponse.consignment.key)

			await CTX.replyWithPhoto({ source: qrFile })
			return await CTX.reply(message, buttons)
		}
	}
}
module.exports = WalletTrait
