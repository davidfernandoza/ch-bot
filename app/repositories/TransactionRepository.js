'use strict'
const Repository = require('./Repository')

class TransactionRepository extends Repository {
	constructor({ Config }) {
		super(Config)
		this.prefix = 'transactions'
	}

	async getTransactionValidate(client_id, data) {
		try {
			return await super.post(
				`${this.prefix}/validate/client/${client_id}`,
				data
			)
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = TransactionRepository
