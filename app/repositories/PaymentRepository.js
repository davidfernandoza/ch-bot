const Repository = require('./Repository')

module.exports = class PaymentRepository extends Repository {
	constructor({ Config }) {
		super(Config)
		this.prefix = 'payments'
	}

	async getBalanceByClient(clientId) {
		return await super.post(`${this.prefix}/get-balance/client/${clientId}`)
	}

	async getPaymentCountOfPeriodByClient(clientId, accessToken) {
		return await super.get(
			`${this.prefix}/get-payment-count-of-period/client/${clientId}`,
			accessToken
		)
	}

	async getPaymentHistoryByClient(clientId, accessToken) {
		return await super.get(
			`${this.prefix}/get-payment-history/client/${clientId}`,
			accessToken
		)
	}

	async collectBalanceByClient(clientId, accessToken) {
		return await super.get(
			`${this.prefix}/collect-balance/client/${clientId}`,
			accessToken
		)
	}
}
