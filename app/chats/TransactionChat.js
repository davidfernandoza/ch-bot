'use strict'
const { Markup } = require('telegraf')
class TransactionChat {
	constructor({ MessageString, MenuChat }) {
		this.messageString = MessageString
		this.menuChat = MenuChat
	}

	async transactionComplete(CTX, dataPrint) {
		try {
			const button = this.menuChat.getButtonOpenMenu()
			const message = this.makeMessageOfTheComplete(dataPrint)
			return await CTX.replyWithMarkdown(message, button)
		} catch (error) {
			throw new Error(error)
		}
	}

	async sendInfoForTransaction(CTX, dataPrint) {
		try {
			const message = this.makeMessageOfTheConsignmentWallet(dataPrint),
				validateButton = this.makeValidateTransactionButton()
			await CTX.replyWithPhoto({ source: dataPrint.qrFile })
			await CTX.replyWithMarkdown(`${dataPrint.consignment.key}`)
			return await CTX.replyWithMarkdown(message, validateButton)
		} catch (error) {
			throw new Error(error)
		}
	}

	async transactionNone(CTX) {
		try {
			const button = this.makeValidateTransactionButton()
			return await CTX.replyWithMarkdown(
				this.messageString.transactionNone,
				button
			)
		} catch (error) {
			throw new Error(error)
		}
	}

	makeMessageOfTheConsignmentWallet(dataPrint) {
		try {
			let message = this.messageString.sendWalletConsignment
			if (dataPrint.status == 'INCOMPLETE') {
				message = this.messageString.transactionIncomplete
				message = message.replace(
					'#TOTAL',
					dataPrint.value + dataPrint.difference
				)
				message = message.replace(/#AMOUNT/g, dataPrint.difference)
			} else {
				message = message.replace('#AMOUNT', dataPrint.plan.consignment_value)
			}
			return message
		} catch (error) {
			throw new Error(error)
		}
	}

	makeMessageOfTheComplete(dataPrint) {
		try {
			let message = this.messageString.transactionComplete
			message = message.replace('#DATE', dataPrint.period)
			return message
		} catch (error) {
			throw new Error(error)
		}
	}

	makeValidateTransactionButton() {
		try {
			return Markup.inlineKeyboard([
				Markup.button.callback(
					'✔️ Validar transacción',
					`transactionValidate:NONE`
				)
			])
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = TransactionChat
