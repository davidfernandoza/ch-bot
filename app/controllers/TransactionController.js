'use strict'

class TransactionController {
	constructor({
		TransactionValidateDomain,
		TransactionChat,
		TransactionDomain,
		ClientRepository,
		ErrorHandler,
		DefaultString
	}) {
		this.transactionValidateDomain = TransactionValidateDomain
		this.errorHandler = ErrorHandler
		this.transactionChat = TransactionChat
		this.defaultString = DefaultString
		this.transactionDomain = TransactionDomain
		this.clientRepository = ClientRepository
	}

	async getValidationInBack(CTX) {
		try {
			return await this.transactionValidateDomain.getValidatedForTransaction(
				CTX
			)
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}

	async sendTransaction(CTX) {
		try {
			const clientMongo = CTX.client
			return await this.transactionDomain.openTransaction(CTX, clientMongo)
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}

	async openTransactionWithBalance(CTX) {
		try {
			return await this.transactionDomain.doTransactionWithBalance(CTX)
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}
}
module.exports = TransactionController
