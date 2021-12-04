'use strict'

class WalletDomain {
	constructor({ ClientRepository, WalletRepository, PlanRepository, Config }) {
		this.clientRepository = ClientRepository
		this.walletRepository = WalletRepository
		this.planRepository = PlanRepository
		this.config = Config
	}

	async storeWalletInBack(keyWallet, clientMongo) {
		const client_id = clientMongo.client_id
		const dataWallet = await this.buildWalletObject(keyWallet, client_id)
		const wallet = await this.walletRepository.storeWallet(dataWallet)
		return await this.storeWalletInMongo(clientMongo, wallet)
	}
	async updateWalletInBack(keyWallet, clientMongo, walletId) {
		const client_id = clientMongo.client_id
		const dataWallet = await this.buildWalletObject(keyWallet, client_id)
		dataWallet.id = walletId
		const wallet = await this.walletRepository.updateWallet(dataWallet)
		return await this.storeWalletInMongo(clientMongo, wallet)
	}

	async buildWalletObject(key, client_id) {
		const addresses = await this.walletRepository.getWalletInfoInTronGrid(key)
		const address = addresses.data[0].address
		const status = true
		return { key, client_id, address, status }
	}

	async storeWalletInMongo(clientMongo, walletData) {
		clientMongo.wallet = { ...walletData }
		return await this.clientRepository.updateClientInMongo(clientMongo)
	}
}

module.exports = WalletDomain
