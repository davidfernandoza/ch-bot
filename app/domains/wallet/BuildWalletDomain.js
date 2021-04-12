'use strict'

class BuildWalletDomain {
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

	async makeDataPrintForConsignmentWallet(clientMongo) {
		try {
			const plan = await this.planRepository.getPlan(clientMongo.plan_id),
				consignmentWallet = await this.walletRepository.getConsignmentWalletAvailable()
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

module.exports = BuildWalletDomain
