'use strict'
class TransactionValidateDomain {
	constructor({
		ClientRepository,
		TransactionRepository,
		WalletRepository,
		AuthDomain,
		QrCodeService,
		DefaultString,
		Config
	}) {
		this.clientRepository = ClientRepository
		this.transactionRepository = TransactionRepository
		this.walletRepository = WalletRepository
		this.config = Config
		this.qrCodeService = QrCodeService
		this.authDomain = AuthDomain
		this.defaultString = DefaultString
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
			const arrayValidate = this.defaultString.VALIDATE_TRANSACTION_STATUS
			if (transactionResponse.status == 'INCOMPLETE') {
				transactionResponse.consignment =
					await this.walletRepository.getConsignmentWalletAvailable()
				transactionResponse.qrFile = await this.makeQRCodeForConsignments(
					transactionResponse.difference,
					transactionResponse.consignment
				)
			} else if (arrayValidate.includes(transactionResponse.status)) {
				client.status = 'ACTIVE'
				client.action_bot = { ...client.action_bot, action: 'NONE' }
				client.wallet = { ...client.wallet, action_wallet: 'NONE' }
				client.period = transactionResponse.period
				await this.authDomain.login(client)
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
