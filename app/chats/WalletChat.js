'use strict'
const { Markup } = require('telegraf')

class WalletChat {
	constructor({ MessageString, TransactionChat }) {
		this.messageString = MessageString
		this.transactionChat = TransactionChat
	}

	async sendMessageWithQRCode(CTX, dataPrint) {
		try {
			await this.transactionChat.sendInfoForTransaction(CTX, dataPrint)
			return await CTX.replyWithMarkdown(
				this.messageString.sendChangeToWallet,
				this.makeChangeWalletButton()
			)
		} catch (error) {
			throw new Error(error)
		}
	}

	async changeToWallet(CTX) {
		try {
			const changeButton = this.makeChangeWalletButton()
			return await CTX.replyWithMarkdown(
				this.messageString.wishChangeToWallet,
				changeButton
			)
		} catch (error) {
			throw new Error(error)
		}
	}

	async askTronWallet(CTX) {
		try {
			return await CTX.replyWithMarkdown(this.messageString.sendTronAddress)
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
