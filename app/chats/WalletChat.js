'use strict'
const { Markup } = require('telegraf')

class WalletChat {
	constructor({ MessageString, TransactionChat }) {
		this.messageString = MessageString
		this.transactionChat = TransactionChat
	}

	async changeWalletForRegister(CTX) {
		return await CTX.replyWithMarkdown(
			this.messageString.sendChangeToWallet,
			this.makeChangeWalletButton(true)
		)
	}

	async changeWallet(CTX) {
		const changeButton = this.makeChangeWalletButton()
		return await CTX.replyWithMarkdown(
			this.messageString.wishChangeToWallet,
			changeButton
		)
	}

	async correctWalleChange(CTX) {
		return await CTX.replyWithMarkdown(this.messageString.correctWalleChange)
	}

	async askTronWallet(CTX) {
		return await CTX.replyWithMarkdown(this.messageString.sendTronAddress)
	}

	makeChangeWalletButton(isRegister) {
		const action = isRegister ? 'UPDATE_NEW_WALLET' : 'UPDATE_WALLET'
		return Markup.inlineKeyboard([
			Markup.button.callback(
				'✔️ Cambiar direccion tron',
				`changeWallet:${action}`
			)
		])
	}
}
module.exports = WalletChat
