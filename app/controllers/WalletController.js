'use strict'

class WalletController {
	constructor({
		ErrorHandler,
		ActionWalletDomain,
		WalletRepository,
		WalletValidate,
		WalletDomain,
		WalletChat,
		ClientRepository,
		ClientDomain,
		ValidateChat,
		Config
	}) {
		this.actionWalletDomain = ActionWalletDomain
		this.walletValidate = WalletValidate
		this.walletChat = WalletChat
		this.walletDomain = WalletDomain
		this.walletRepository = WalletRepository
		this.clientRepository = ClientRepository
		this.clientDomain = ClientDomain
		this.errorHandler = ErrorHandler
		this.validateChat = ValidateChat
		this.config = Config
	}

	async storWallet(CTX) {
		try {
			const keyWallet = CTX.message.text

			// TODO: Hacer middleware para estas validaciones
			if (!(await this.walletValidate.validateKeyWallet(keyWallet))) {
				return await this.validateChat.sendErrorKeyWallet(CTX)
			}
			const clientMongo = CTX.client,
				walletMongo = CTX.client.wallet,
				dataWallet = this.walletDomain.makeBackWallet(
					keyWallet,
					clientMongo.client_id
				),
				response =
					walletMongo.action_wallet == 'CREATE_WALLET'
						? await this.walletRepository.storeWallet(dataWallet)
						: await this.walletRepository.updateWallet(
								dataWallet,
								walletMongo.id
						  ),
				dataPrint = this.walletDomain.managerResponseWhenCreatingWallet(
					clientMongo,
					response
				)
			return await this.walletChat.sendMessageWithQRCode(CTX, dataPrint)
		} catch (error) {
			this.errorHandler.sendError(CTX, error)
		}
	}

	async storWallet(CTX) {
		try {
			const keyWallet = CTX.message.text

			// TODO: Hacer middleware para estas validaciones
			if (!(await this.walletValidate.validateKeyWallet(keyWallet))) {
				return await this.validateChat.sendErrorKeyWallet(CTX)
			}
			const clientMongo = CTX.client,
				walletMongo = CTX.client.wallet,
				dataWallet = this.walletDomain.makeBackWallet(
					keyWallet,
					clientMongo.client_id
				),
				response =
					walletMongo.action_wallet == 'CREATE_WALLET'
						? await this.walletRepository.storeWallet(dataWallet)
						: await this.walletRepository.updateWallet(
								dataWallet,
								walletMongo.id
						  ),
				dataPrint = this.walletDomain.managerResponseWhenCreatingWallet(
					clientMongo,
					response
				)
			return await this.walletChat.sendMessageWithQRCode(CTX, dataPrint)
		} catch (error) {
			this.errorHandler.sendError(CTX, error)
		}
	}

	async assingWalletAction(CTX, action) {
		try {
			await this.actionWalletDomain.resetActionInClientWallet(CTX, action)
			return await this.walletChat.askTronWallet(CTX)
		} catch (error) {
			this.errorHandler.sendError(CTX, error)
		}
	}
}

module.exports = WalletController
