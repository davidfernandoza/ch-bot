'use strict'

class WalletDomain {
	constructor({ ClientRepository, WalletRepository, PlanRepository, Config }) {
		this.clientRepository = ClientRepository
		this.walletRepository = WalletRepository
		this.planRepository = PlanRepository
		this.config = Config
	}

	async storeWalletInBack(keyWallet, clientMongo) {
		const dataWallet = { key: keyWallet, client_id: clientMongo.client_id },
			wallet = await this.walletRepository.storeWallet(dataWallet)
		return await this.storeWalletInMongo(clientMongo, wallet)
	}
	async updateWalletInBack(keyWallet, clientMongo, walletId) {
		const dataWallet = {
			id: walletId,
			key: keyWallet,
			client_id: clientMongo.client_id
		}
		const wallet = await this.walletRepository.updateWallet(
			dataWallet,
			walletId
		)
		return await this.storeWalletInMongo(clientMongo, wallet)
	}

	async storeWalletInMongo(clientMongo, walletData) {
		clientMongo.wallet = { ...walletData }
		return await this.clientRepository.updateClientInMongo(clientMongo)
	}
}

module.exports = WalletDomain
