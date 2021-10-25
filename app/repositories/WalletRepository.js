'use strict'
const axios = require('axios')
const Repository = require('./Repository')

class WalletRepository extends Repository {
	constructor({ Config }) {
		super(Config)
		this.tronGridApi = Config.API_TRONGRID
		this.prefix = 'wallets'
	}

	async getConsignmentWalletAvailable() {
		return await super.get(`${this.prefix}/get-consignment`)
	}

	async storeWallet(dataWallet) {
		return await super.post(`${this.prefix}`, dataWallet)
	}

	async updateWallet(dataWallet, walletId) {
		return await super.put(`${this.prefix}/${walletId}`, dataWallet)
	}

	async getWalletInfoInTronGrid(keyWallet) {
		return await axios
			.get(`${this.tronGridApi}/accounts/${keyWallet}`)
			.then(response => response.data)
			.catch(error => {
				return false
			})
	}
}

module.exports = WalletRepository
