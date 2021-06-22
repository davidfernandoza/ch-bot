'use strict'
class TransactionChat {
	constructor({ MessageString, MenuChat, WalletChat }) {
		this.messageString = MessageString
		this.menuChat = MenuChat
		this.walletChat = WalletChat
	}

	async transactionComplete(CTX, dataPrint) {
		const button = this.menuChat.getButtonOpenMenu()
		const message = this.makeMessageOfTheComplete(dataPrint)
		return await CTX.replyWithMarkdown(message, button)
	}

	async transactionIncomplete(CTX, dataPrint) {
		const message = this.makeMessageOfTheIncompleteError(dataPrint)
		const button = this.walletChat.makeValidateTransactionButton()
		await CTX.replyWithPhoto({ source: dataPrint.qrFile })
		return await CTX.replyWithMarkdown(message, button)
	}
	async transactionNone(CTX) {
		const button = this.walletChat.makeValidateTransactionButton()
		return await CTX.replyWithMarkdown(
			this.messageString.transactionNone,
			button
		)
	}

	makeMessageOfTheIncompleteError(dataPrint) {
		let message = this.messageString.transactionIncomplete
		message = message.replace('#TOTAL', dataPrint.value + dataPrint.difference)
		message = message.replace(/#AMOUNT/g, dataPrint.difference)
		message = message.replace('#KEY', dataPrint.consignment.key)
		return message
	}
	makeMessageOfTheComplete(dataPrint) {
		let message = this.messageString.transactionComplete
		message = message.replace('#DATE', dataPrint.period)
		return message
	}
}
module.exports = TransactionChat
