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

	async makeBackWallet(keyWallet, clientId) {
		return { key: keyWallet, client_id: clientId }
	}

	async responseManagerWhenCreatingWallet(clientMongo, dataResponse) {
		try {
			await this.clientDomain.assignAction(clientMongo) //Resetea la accion del cliente
			await this.storeNewWalletInMongo(clientMongo, dataResponse)
			return await this.makeDataPrintForConsignmentWallet(clientMongo)
		} catch (error) {
			throw new Error(error)
		}
	}

	async assignActionWallet(client, actionWallet) {
		try {
			client.wallet.action_wallet = actionWallet
			return await this.clientRepository.updateClientInMongo(client)
		} catch (error) {
			throw new Error(error)
		}
	}

	async storeNewWalletInMongo(clientMongo, dataResponse) {
		try {
			clientMongo.wallet = { ...dataResponse }
			return await this.clientRepository.updateClientInMongo(clientMongo)
		} catch (error) {
			throw new Error(error)
		}
	}

	async makeDataPrintForConsignmentWallet(clientMongo) {
		try {
			const plan = await this.planRepository.getPlan(clientMongo.plan_id),
				consignmentWallet = await this.getConsignmentWalletAvailable()
			return {
				plan: plan,
				consignment: consignmentWallet,
				qrFile: await this.makeQRCodeForConsignments(plan, consignmentWallet)
			}
		} catch (error) {
			throw new Error(error)
		}
	}

	async makeQRCodeForConsignments(plan, consignment) {
		try {
			return await this.qrCodeService.generate(
				`tron:${consignment.key}?amount=${plan.consignment_value}&req-asset=${this.config.ASSET_ID}`
			)
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = WalletDomain
