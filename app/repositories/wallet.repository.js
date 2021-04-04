'use strict'
const RepositoryAPI = require('./repository-api')

class WalletRepository extends RepositoryAPI {
	constructor({ Config }) {
		super(Config)
		this.prefix = 'wallets'
	}

	async getConsignmentWalletAvailable() {
		try {
			return await super.get(`${this.prefix}/get-consignment`)
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = WalletRepository
