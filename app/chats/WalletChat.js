'use strict'
const { Markup } = require('telegraf')

class WalletChat {
	constructor({ MessageString, TransactionChat }) {
		this.messageString = MessageString
		this.transactionChat = TransactionChat
	}

	async changeWalletForRegister(CTX) {
		try {
			return await CTX.replyWithMarkdown(
				this.messageString.sendChangeToWallet,
				this.makeChangeWalletButton(true)
			)
		} catch (error) {
			throw new Error(error)
		}
	}

	async changeWallet(CTX) {
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

	async correctWalleChange(CTX) {
		try {
			return await CTX.replyWithMarkdown(this.messageString.correctWalleChange)
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

	makeChangeWalletButton(isRegister) {
		try {
			const action = isRegister ? 'UPDATE_NEW_WALLET' : 'UPDATE_WALLET'
			console.log('====================================')
			console.log(action)
			console.log('====================================')
			return Markup.inlineKeyboard([
				Markup.button.callback(
					'✔️ Cambiar direccion tron',
					`changeWallet:${action}`
				)
			])
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = WalletChat
