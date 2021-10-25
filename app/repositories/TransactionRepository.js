'use strict'
const Repository = require('./Repository')

class TransactionRepository extends Repository {
	constructor({ Config }) {
		super(Config)
		this.prefix = 'transactions'
	}

	async getTransactionValidate(client_id, data) {
		return await super.post(`${this.prefix}/validate/client/${client_id}`, data)
	}
}

module.exports = TransactionRepository
