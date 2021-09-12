'use strict'

class TransactionController {
	constructor({
		TransactionValidateDomain,
		TransactionChat,
		ErrorHandler,
		DefaultString
	}) {
		this.transactionValidateDomain = TransactionValidateDomain
		this.errorHandler = ErrorHandler
		this.transactionChat = TransactionChat
		this.defaultString = DefaultString
	}

	async getValidationInBack(CTX) {
		try {
			const arrayValidate = this.defaultString.VALIDATE_TRANSACTION_STATUS,
				response =
					await this.transactionValidateDomain.getValidatedForTransaction(CTX)
			if (arrayValidate.includes(response.status)) {
				return await this.transactionChat.transactionComplete(CTX, response)
			} else if (response.status == 'INCOMPLETE') {
				return await this.transactionChat.sendInfoForTransaction(CTX, response)
			} else {
				return await this.transactionChat.transactionNone(CTX)
			}
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}
}
module.exports = TransactionController
