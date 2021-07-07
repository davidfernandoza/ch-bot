'use strict'
class TransactionChat {
	constructor({ MessageString, MenuChat, WalletChat }) {
		this.messageString = MessageString
		this.menuChat = MenuChat
		this.walletChat = WalletChat
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

	async transactionIncomplete(CTX, dataPrint) {
		try {
			const message = this.makeMessageOfTheIncompleteError(dataPrint)
			const button = this.walletChat.makeValidateTransactionButton()
			await CTX.replyWithPhoto({ source: dataPrint.qrFile })
			return await CTX.replyWithMarkdown(message, button)
		} catch (error) {
			throw new Error(error)
		}
	}
	async transactionNone(CTX) {
		try {
			const button = this.walletChat.makeValidateTransactionButton()
			return await CTX.replyWithMarkdown(
				this.messageString.transactionNone,
				button
			)
		} catch (error) {
			throw new Error(error)
		}
	}

	makeMessageOfTheIncompleteError(dataPrint) {
		try {
			let message = this.messageString.transactionIncomplete
			message = message.replace(
				'#TOTAL',
				dataPrint.value + dataPrint.difference
			)
			message = message.replace(/#AMOUNT/g, dataPrint.difference)
			message = message.replace('#KEY', dataPrint.consignment.key)
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
}
module.exports = TransactionChat
