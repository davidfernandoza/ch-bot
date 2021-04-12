'use strict'

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

	async storeWalletInBack(clientMongo, dataResponse) {
		try {
			clientMongo.wallet = { ...dataResponse }
			return await this.clientRepository.updateClientInMongo(clientMongo)
		} catch (error) {
			throw new Error(error)
		}
	}

	async storeWalletInMongo(clientMongo, dataResponse) {
		try {
			clientMongo.wallet = { ...dataResponse }
			return await this.clientRepository.updateClientInMongo(clientMongo)
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = WalletDomain
