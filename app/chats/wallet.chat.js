'use strict'
const { Markup } = require('telegraf')

class WalletChat {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async sendMessageWithQRCode(CTX, dataPrint) {
		try {
			const message = this.makeMessageOfTheConsignmentWallet(dataPrint),
				buttons = Markup.inlineKeyboard([
					Markup.button.callback(
						'✔️ Validar consignación',
						`consignmentValidate:NONE`
					),
					Markup.button.callback(
						'✔️ Cambiar direccion tron',
						`changeWallet:UPDATE_WALLET`
					)
				])
			await CTX.replyWithPhoto({ source: dataPrint.qrFile })
			return await CTX.reply(message, buttons)
		} catch (error) {
			throw new Error(error)
		}
	}
	async askTronWallet(CTX) {
		try {
			return await CTX.reply(this.messageString.sendTronAddress)
		} catch (error) {
			throw new Error(error)
		}
	}

	makeMessageOfTheConsignmentWallet(dataPrint) {
		try {
			let message = this.messageString.sendWalletConsignment
			message = message.replace('#AMOUNT', dataPrint.plan.consignment_value)
			message = message.replace('#KEY', dataPrint.consignment.key)
			return message
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = WalletChat
