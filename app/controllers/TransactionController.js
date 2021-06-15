'use strict'

class TransactionController {
	constructor({ TransactionValidateDomain, TransactionChat, ErrorHandler }) {
		this.transactionValidateDomain = TransactionValidateDomain
		this.errorHandler = ErrorHandler
		this.transactionChat = TransactionChat
	}

	async getValidationInBack(CTX) {
		try {
			const response =
				await this.transactionValidateDomain.getValidatedForTransaction(CTX)
			if (response.status == 'COMPLETE') {
				return await this.transactionChat.completeTransaction(CTX, response)
			} else if (response.status == 'INCOMPLETE') {
				return await this.transactionChat.incompleteTransaction(CTX, response)
			} else {
				return await this.transactionChat.noneTransaction(CTX)
			}
		} catch (error) {
			this.errorHandler.sendError(CTX, error)
		}
	}
}
module.exports = TransactionController
