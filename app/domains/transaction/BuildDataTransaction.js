'use strict'

class BuildDataTransaction {
	constructor({ QrCodeService, WalletRepository, PlanDomain, Config }) {
		this.qrCodeService = QrCodeService
		this.walletRepository = WalletRepository
		this.planDomain = PlanDomain
		this.config = Config
	}

	async makeDataPrintForTransaction(CTX, clientMongo) {
		try {
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
				qrFile: await this.makeQRCodeForTransaction(
					planValue,
					consignmentWallet
				)
			}
		} catch (error) {
			throw new Error(error)
		}
	}

	async makeQRCodeForTransaction(value, consignment) {
		try {
			return await this.qrCodeService.generate(
				`tron:${consignment.key}?amount=${value}&req-asset=${this.config.ASSET_ID}`
			)
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = BuildDataTransaction
