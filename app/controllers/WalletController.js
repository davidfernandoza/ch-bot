'use strict'

class WalletController {
	constructor({
		ErrorHandler,
		ActionWalletDomain,
		TransactionDomain,
		WalletDomain,
		ClientDomain,
		WalletChat,
		Config
	}) {
		this.actionWalletDomain = ActionWalletDomain
		this.walletChat = WalletChat
		this.walletDomain = WalletDomain
		this.errorHandler = ErrorHandler
		this.clientDomain = ClientDomain
		this.transactionDomain = TransactionDomain
		this.config = Config
	}

	async storeWallet(CTX) {
		try {
			const walletKey = CTX.message.text
			const walletMongo = { ...CTX.client.wallet }
			const clientMongo = CTX.client

			if (walletMongo.action_wallet == this.config.STRINGS.CREATE_WALLET) {
				await this.walletDomain.storeWalletInBack(walletKey, clientMongo)
			} else {
				await this.walletDomain.updateWalletInBack(walletKey, clientMongo)
			}

			if (walletMongo.action_wallet == this.config.STRINGS.UPDATE_WALLET) {
				await this.walletChat.correctWalleChange(CTX)
			} else {
				await this.transactionDomain.openTransaction(CTX, clientMongo, true)
			}
			return await this.clientDomain.assignActionToClient(clientMongo)
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}

	async assingWalletAction(CTX, action) {
		try {
			await this.actionWalletDomain.resetActionInClientWallet(CTX, action)
			return await this.walletChat.askTronWallet(CTX)
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}

	async changeWallet(CTX) {
		try {
			await this.walletChat.changeWallet(CTX)
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}
}

module.exports = WalletController
