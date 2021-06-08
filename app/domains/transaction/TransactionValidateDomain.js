'use strict'
const moment = require('moment')

class TransactionValidateDomain {
	constructor({ ClientRepository, TransactionRepository }) {
		this.clientRepository = ClientRepository
		this.transactionRepository = TransactionRepository
	}

	async getValidatedForTransaction(CTX) {
		try {
			const client = await this.clientRepository.getClientByTelegramIdInMongo(
					CTX.from.id
				),
				transactionResponse =
					await this.transactionRepository.getTransactionValidate(
						client.client_id
					)
			// transactionResponse : { status: 'NONE' }
			console.log('====================================')
			console.log(transactionResponse)
			console.log('====================================')
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = TransactionValidateDomain
