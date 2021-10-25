'use strict'
const { Markup } = require('telegraf')
class TransactionChat {
	constructor({ MessageString, MenuChat }) {
		this.messageString = MessageString
		this.menuChat = MenuChat
	}

	async transactionComplete(CTX, dataPrint) {
		const button = this.menuChat.getButtonOpenMenu()
		const message = this.makeMessageOfTheComplete(dataPrint)
		return await CTX.replyWithMarkdown(message, button)
	}

	async sendInfoForTransaction(CTX, dataPrint) {
		const message = this.makeMessageOfTheConsignmentWallet(dataPrint),
			validateButton = this.makeValidateTransactionButton()
		await CTX.replyWithPhoto({ source: dataPrint.qrFile })
		await CTX.replyWithMarkdown(`${dataPrint.consignment.key}`)
		return await CTX.replyWithMarkdown(message, validateButton)
	}

	async transactionNone(CTX) {
		const button = this.makeValidateTransactionButton()
		return await CTX.replyWithMarkdown(
			this.messageString.transactionNone,
			button
		)
	}

	makeMessageOfTheConsignmentWallet(dataPrint) {
		let message = this.messageString.sendWalletConsignment
		if (dataPrint.status == 'INCOMPLETE') {
			message = this.messageString.transactionIncomplete
			message = message.replace(
				'#TOTAL',
				dataPrint.value + dataPrint.difference
			)
			message = message.replace(/#AMOUNT/g, dataPrint.difference)
		} else {
			message = message.replace('#AMOUNT', dataPrint.planValue)
		}
		return message
	}

	makeMessageOfTheComplete(dataPrint) {
		let message = this.messageString.transactionComplete
		message = message.replace('#DATE', dataPrint.period)
		return message
	}

	makeValidateTransactionButton() {
		return Markup.inlineKeyboard([
			Markup.button.callback(
				'✔️ Validar transacción',
				`transactionValidate:NONE`
			)
		])
	}
}
module.exports = TransactionChat
