'use strict'
const Repository = require('./Repository')

class TransactionRepository extends Repository {
	constructor({ Config }) {
		super(Config)
		this.prefix = 'transactions'
	}

	async getTransactionValidate(client_id) {
		return await super.post(`${this.prefix}/validate/client/${client_id}`, {})
	}

	async doTransactionWithBalance(client_id, access_token) {
		return await super.post(
			`${this.prefix}/buy-plan-with-balance/client/${client_id}`,
			{},
			access_token
		)
	}
}

module.exports = TransactionRepository
