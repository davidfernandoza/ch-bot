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
		try {
			return await super.get(`${this.prefix}/get-consignment`)
		} catch (error) {
			throw new Error(error)
		}
	}

	async storeWallet(dataWallet) {
		try {
			return await super.post(`${this.prefix}`, dataWallet)
		} catch (error) {
			throw new Error(error)
		}
	}

	async updateWallet(dataWallet, walletId) {
		try {
			return await super.put(`${this.prefix}/${walletId}`, dataWallet)
		} catch (error) {
			throw new Error(error)
		}
	}

	async getWalletInfoInTronGrid(keyWallet) {
		try {
			return await axios
				.get(`${this.tronGridApi}/accounts/${keyWallet}`)
				.then(response => response.data)
				.catch(error => {
					if (error.response.status == 400) return error.response.data
					throw new Error(error)
				})
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = WalletRepository