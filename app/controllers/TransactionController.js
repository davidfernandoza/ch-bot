'use strict'

class TransactionController {
	constructor({ TransactionValidateDomain, TransactionChat, ErrorHandler }) {
		this.transactionValidateDomain = TransactionValidateDomain
		this.errorHandler = ErrorHandler
		this.transactionChat = TransactionChat
	}

	async getValidationInBack(CTX) {
		try {
			const validate =
				await this.transactionValidateDomain.getValidatedForTransaction(CTX)
			if (validate) {
				return await this.transactionChat.correctTransaction(CTX)
			} else return await this.transactionChat.incorrectTransaction(CTX)
		} catch (error) {
			this.errorHandler.sendError(CTX, error)
		}
	}
}
module.exports = TransactionController
