const Repository = require('./Repository')

module.exports = class PaymentRepository extends Repository {
	constructor({ Config }) {
		super(Config)
		this.prefix = 'payments'
	}

	async getBalanceByUser(clientId, accessToken) {
		return await super.get(
			`${this.prefix}/get-balance/client/${clientId}`,
			accessToken
		)
	}

	async collectBalance(clientId, accessToken) {
		return await super.get(
			`${this.prefix}/collect-balance/client/${clientId}`,
			accessToken
		)
	}
}
