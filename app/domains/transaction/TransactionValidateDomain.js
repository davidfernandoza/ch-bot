'use strict'
class TransactionValidateDomain {
	constructor({
		ClientRepository,
		TransactionRepository,
		WalletRepository,
		AuthDomain,
		QrCodeService,
		DefaultString,
		StatusClientDomain,
		BuildDataTransaction,
		ClientDomain,
		Config
	}) {
		this.clientRepository = ClientRepository
		this.transactionRepository = TransactionRepository
		this.walletRepository = WalletRepository
		this.config = Config
		this.qrCodeService = QrCodeService
		this.authDomain = AuthDomain
		this.defaultString = DefaultString
		this.statusClientDomain = StatusClientDomain
		this.clientDomain = ClientDomain
		this.buildDataTransaction = BuildDataTransaction
	}

	async getValidatedForTransaction(CTX) {
		const arrayValidate = this.defaultString.VALIDATE_TRANSACTION_STATUS
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			CTX.from.id
		)
		const transactionResponse =
			await this.transactionRepository.getTransactionValidate(client.client_id)

		if (transactionResponse.status == 'INCOMPLETE') {
			this.incompleteStatusManager(transactionResponse, client)
		} else if (arrayValidate.includes(transactionResponse.status)) {
			this.completeStatusManger(transactionResponse, client)
		}
		return transactionResponse
	}

	async completeStatusManger(transactionResponse, client) {
		const status = transactionResponse.client_status
		client = this.changeActionNoneManager(client)
		client.period = transactionResponse.period
		await this.statusClientDomain.updateClientStatus(client, status)
		await this.authDomain.login(client)
	}

	async incompleteStatusManager(transactionResponse, client) {
		transactionResponse.consignment =
			await this.walletRepository.getConsignmentWalletAvailable()
		transactionResponse.qrFile =
			await this.buildDataTransaction.makeQRCodeForTransaction(
				transactionResponse.difference,
				transactionResponse.consignment
			)
		await this.statusClientDomain.addIncompleteClient(client)
	}

	changeActionNoneManager(client) {
		client.action_bot = { ...client.action_bot, action: 'NONE' }
		client.wallet = { ...client.wallet, action_wallet: 'NONE' }
		return client
	}
}

module.exports = TransactionValidateDomain
