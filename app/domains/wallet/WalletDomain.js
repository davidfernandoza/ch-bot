'use strict'

const { response } = require('express')

class WalletDomain {
	constructor({
		ClientRepository,
		QrCodeService,
		WalletRepository,
		PlanRepository,
		Config
	}) {
		this.clientRepository = ClientRepository
		this.qrCodeService = QrCodeService
		this.walletRepository = WalletRepository
		this.planRepository = PlanRepository
		this.config = Config
	}

	async storeWalletInBack(keyWallet, clientMongo) {
		try {
			const dataWallet = { key: keyWallet, client_id: clientMongo.client_id },
				wallet = await this.walletRepository.storeWallet(dataWallet)
			return await this.storeWalletInMongo(clientMongo, wallet)
		} catch (error) {
			throw new Error(error)
		}
	}
	async updateWalletInBack(keyWallet, clientMongo, walletId) {
		try {
			const dataWallet = { key: keyWallet, client_id: clientMongo.client_id },
				wallet = await this.walletRepository.updateWallet(dataWallet, walletId)
			return await this.storeWalletInMongo(clientMongo, wallet)
		} catch (error) {
			throw new Error(error)
		}
	}

	async storeWalletInMongo(clientMongo, walletData) {
		try {
			clientMongo.wallet = { ...walletData }
			return await this.clientRepository.updateClientInMongo(clientMongo)
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = WalletDomain
