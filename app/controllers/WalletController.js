'use strict'

class WalletController {
	constructor({
		ErrorHandler,
		ActionWalletDomain,
		BuildWalletDomain,
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
		this.buildWalletDomain = BuildWalletDomain
		this.config = Config
	}

	async storeWallet(CTX) {
		try {
			const walletKey = CTX.message.text,
				walletMongo = CTX.client.wallet,
				clientMongo = CTX.client,
				dataPrint =
					await this.buildWalletDomain.makeDataPrintForConsignmentWallet(
						clientMongo
					)
			if (walletMongo.action_wallet == this.config.STRINGS.CREATE_WALLET) {
				await this.walletDomain.storeWalletInBack(walletKey, clientMongo)
			} else {
				await this.walletDomain.updateWalletInBack(
					walletKey,
					clientMongo,
					walletMongo.id
				)
				await this.clientDomain.assignActionToClient(clientMongo)
				return await this.walletChat.sendMessageWithQRCode(CTX, dataPrint)
			}
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
}

module.exports = WalletController
