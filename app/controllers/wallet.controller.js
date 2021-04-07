'use strict'

class WalletController {
	constructor({
		ErrorHandler,
		WalletRepository,
		WalletValidate,
		WalletDomain,
		WalletChat,
		ClientRepository,
		ClientDomain,
		ValidateChat
	}) {
		this.walletValidate = WalletValidate
		this.walletChat = WalletChat
		this.walletDomain = WalletDomain
		this.walletRepository = WalletRepository
		this.clientRepository = ClientRepository
		this.clientDomain = ClientDomain
		this.errorHandler = ErrorHandler
		this.validateChat = ValidateChat
	}

	async storeWallet(CTX) {
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
				dataPrint = this.walletDomain.responseManagerWhenCreatingWallet(
					clientMongo,
					response
				)
			return await this.walletChat.sendMessageWithQRCode(CTX, dataPrint)
		} catch (error) {
			this.errorHandler.sendError(CTX, error)
		}
	}

	async resetActionInClientWallet(CTX, action) {
		try {
			let actionWallet = !action ? 'CREATE_WALLET' : action,
				actionBot = 'GET_WALLET',
				telegramId = CTX.from.id,
				client = await this.clientRepository.getClientByTelegramIdInMongo(
					telegramId
				)
			client = this.clientDomain.assignAction(client, actionBot)
			client = this.walletDomain.assignActionWallet(client, actionWallet)
			return await CTX.reply(this.messageString.sendTronAddress)
		} catch (error) {
			this.errorHandler.sendError(CTX, error)
		}
	}
}

module.exports = WalletController
