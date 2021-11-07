'use strict'

module.exports = class TransactionDomain {
	constructor({
		BuildDataTransaction,
		TransactionRepository,
		TransactionChat,
		TransactionValidateDomain,
		ClientRepository,
		WalletChat
	}) {
		this.buildDataTransaction = BuildDataTransaction
		this.transactionChat = TransactionChat
		this.walletChat = WalletChat
		this.transactionRepository = TransactionRepository
		this.transactionValidateDomain = TransactionValidateDomain
		this.clientRepository = ClientRepository
	}

	async openTransaction(CTX, client, withWalletChange) {
		const dataPrint =
			await this.buildDataTransaction.makeDataPrintForTransaction(client)
		if (!dataPrint) return false
		await this.transactionChat.sendInfoForTransaction(CTX, dataPrint)
		if (withWalletChange) await this.walletChat.changeWalletForRegister(CTX)
		return true
	}

	async doTransactionWithBalance(CTX) {
		const telegramId = CTX.from.id
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			telegramId
		)
		const clientId = client.client_id
		const accessToken = client.auth.access_token
		const transactionResponse =
			await this.transactionRepository.doTransactionWithBalance(
				clientId,
				accessToken
			)
		return await this.transactionValidateDomain.transactionResponseManager(
			CTX,
			client,
			transactionResponse
		)
	}
}
