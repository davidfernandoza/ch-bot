'use strict'

module.exports = class TransactionDomain {
	constructor({ BuildDataTransaction, TransactionChat, WalletChat }) {
		this.buildDataTransaction = BuildDataTransaction
		this.transactionChat = TransactionChat
		this.walletChat = WalletChat
	}

	async openTransaction(CTX, client, withWalletChange) {
		const dataPrint =
			await this.buildDataTransaction.makeDataPrintForTransaction(CTX, client)
		if (!dataPrint) return false
		await this.transactionChat.sendInfoForTransaction(CTX, dataPrint)
		if (withWalletChange) await this.walletChat.changeWalletForRegister(CTX)
		return true
	}
}
