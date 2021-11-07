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
		TransactionChat,
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
		this.transactionChat = TransactionChat
	}

	async getValidatedForTransaction(CTX) {
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			CTX.from.id
		)
		const transactionResponse =
			await this.transactionRepository.getTransactionValidate(client.client_id)
		return await this.transactionResponseManager(
			CTX,
			client,
			transactionResponse
		)
	}

	async transactionResponseManager(CTX, client, response) {
		const arrayValidate = this.defaultString.VALIDATE_TRANSACTION_STATUS

		if (response.status == 'INCOMPLETE') {
			this.incompleteStatusManager(response, client)
			return await this.transactionChat.sendInfoForTransaction(CTX, response)
		} else if (arrayValidate.includes(response.status)) {
			this.completeStatusManger(response, client)
			return await this.transactionChat.transactionComplete(CTX, response)
		} else {
			return await this.transactionChat.transactionNone(CTX)
		}
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
