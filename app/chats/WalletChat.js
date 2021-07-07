'use strict'
const { Markup } = require('telegraf')

class WalletChat {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async sendMessageWithQRCode(CTX, dataPrint) {
		try {
			await this.sendInfoForTransaction(CTX, dataPrint)
			return await CTX.replyWithMarkdown(
				this.messageString.sendChangeToWallet,
				this.makeChangeWalletButton()
			)
		} catch (error) {
			throw new Error(error)
		}
	}

	async sendInfoForTransaction(CTX, dataPrint) {
		const message = this.makeMessageOfTheConsignmentWallet(dataPrint),
			validateButton = this.makeValidateTransactionButton()
		await CTX.replyWithPhoto({ source: dataPrint.qrFile })
		return await CTX.replyWithMarkdown(message, validateButton)
	}

	async changeToWallet(CTX) {
		const changeButton = this.makeChangeWalletButton()
		return await CTX.replyWithMarkdown(
			this.messageString.wishChangeToWallet,
			changeButton
		)
	}

	async askTronWallet(CTX) {
		try {
			return await CTX.replyWithMarkdown(this.messageString.sendTronAddress)
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

	makeValidateTransactionButton() {
		try {
			return Markup.inlineKeyboard([
				Markup.button.callback(
					'✔️ Validar Transacción',
					`transactionValidate:NONE`
				)
			])
		} catch (error) {
			throw new Error(error)
		}
	}
	makeChangeWalletButton() {
		try {
			return Markup.inlineKeyboard([
				Markup.button.callback(
					'✔️ Cambiar direccion tron',
					`changeWallet:UPDATE_WALLET`
				)
			])
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = WalletChat
