'use strict'
const { Markup } = require('telegraf')

class TransactionChat {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async completeTransaction(CTX, dataPrint) {
		const button = this.getButtonOpenMenu()
		const message = this.makeMessageOfTheComplete(dataPrint, button)
		return await CTX.reply(message)
	}

	async incompleteTransaction(CTX, dataPrint) {
		const message = this.makeMessageOfTheIncompleteError(dataPrint)
		const button = this.getButtonValidate()
		await CTX.replyWithPhoto({ source: dataPrint.qrFile })
		return await CTX.reply(message, button)
	}
	async noneTransaction(CTX) {
		const button = this.getButtonValidate()
		return await CTX.reply(this.messageString.noneTransaction, button)
	}

	makeMessageOfTheIncompleteError(dataPrint) {
		let message = this.messageString.transactionIncomplete
		message = message.replace('#TOTAL', dataPrint.value + dataPrint.difference)
		message = message.replace(/#AMOUNT/g, dataPrint.difference)
		message = message.replace('#KEY', dataPrint.consignment.key)
		return message
	}
	makeMessageOfTheComplete(dataPrint) {
		let message = this.messageString.completeTransaction
		message = message.replace('#DATE', dataPrint.period)
		return message
	}
	getButtonValidate() {
		return Markup.inlineKeyboard([
			Markup.button.callback(
				'✔️ Validar Transacción',
				`transactionValidate:NONE`
			)
		])
	}
	getButtonOpenMenu() {
		return Markup.inlineKeyboard([
			Markup.button.callback('🔣 Abrir Menu', `openMenu:NONE`)
		])
	}
}
module.exports = TransactionChat
