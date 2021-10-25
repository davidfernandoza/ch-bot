'use strict'

class BuildDataTransaction {
	constructor({ QrCodeService, WalletRepository, PlanDomain, Config }) {
		this.qrCodeService = QrCodeService
		this.walletRepository = WalletRepository
		this.planDomain = PlanDomain
		this.config = Config
	}

	async makeDataPrintForTransaction(CTX, clientMongo) {
		const planValue = await this.planDomain.getValuePlanByClientManager(
			CTX,
			clientMongo
		)
		if (!planValue) return planValue //false
		const consignmentWallet =
			await this.walletRepository.getConsignmentWalletAvailable()

		return {
			planValue: planValue,
			consignment: consignmentWallet,
			qrFile: await this.makeQRCodeForTransaction(planValue, consignmentWallet)
		}
	}

	async makeQRCodeForTransaction(value, consignment) {
		return await this.qrCodeService.generate(
			`tron:${consignment.key}?amount=${value}&req-asset=${this.config.ASSET_ID}`
		)
	}
}

module.exports = BuildDataTransaction
