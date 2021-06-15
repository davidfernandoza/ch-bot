'use strict'
class TransactionValidateDomain {
	constructor({
		ClientRepository,
		TransactionRepository,
		WalletRepository,
		QrCodeService,
		Config
	}) {
		this.clientRepository = ClientRepository
		this.transactionRepository = TransactionRepository
		this.walletRepository = WalletRepository
		this.config = Config
		this.qrCodeService = QrCodeService
	}

	async getValidatedForTransaction(CTX) {
		try {
			const client = await this.clientRepository.getClientByTelegramIdInMongo(
					CTX.from.id
				),
				transactionResponse =
					await this.transactionRepository.getTransactionValidate(
						client.client_id
					)

			if (transactionResponse.status == 'INCOMPLETE') {
				transactionResponse.consignment =
					await this.walletRepository.getConsignmentWalletAvailable()
				transactionResponse.qrFile = await this.makeQRCodeForConsignments(
					transactionResponse.difference,
					transactionResponse.consignment
				)
			}
			return transactionResponse
		} catch (error) {
			throw new Error(error)
		}
	}

	async makeQRCodeForConsignments(value, consignment) {
		try {
			return await this.qrCodeService.generate(
				`tron:${consignment.key}?amount=${value}&req-asset=${this.config.ASSET_ID}`
			)
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = TransactionValidateDomain
