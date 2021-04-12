'use strict'

class ActionWalletDomain {
	constructor({
		ClientRepository,
		QrCodeService,
		WalletRepository,
		PlanRepository,
		ClientDomain,
		Config
	}) {
		this.clientRepository = ClientRepository
		this.clientDomain = ClientDomain
		this.qrCodeService = QrCodeService
		this.walletRepository = WalletRepository
		this.planRepository = PlanRepository
		this.config = Config
	}

	async managerResponseWhenCreatingWallet(clientMongo, dataResponse) {
		try {
			await this.clientDomain.assignActionToClient(clientMongo) //Resetea la accion del cliente
			await this.storeNewWalletInMongo(clientMongo, dataResponse)
			return await this.makeDataPrintForConsignmentWallet(clientMongo)
		} catch (error) {
			throw new Error(error)
		}
	}

	async resetActionInClientWallet(CTX, action) {
		try {
			const actionWallet = !action
				? this.config.STRINGS.CREATE_WALLET
				: this.config.STRINGS.UPDATE_WALLET

			let actionBot = this.config.STRINGS.GET_WALLET,
				telegramId = CTX.from.id,
				client = await this.clientRepository.getClientByTelegramIdInMongo(
					telegramId
				)
			client = await this.clientDomain.assignActionToClient(client, actionBot)
			console.log(client)
			return await this.assignActionWallet(client, actionWallet)
		} catch (error) {
			throw new Error(error)
		}
	}

	async assignActionWallet(client, actionWallet) {
		try {
			client.wallet.action_wallet = actionWallet
			return await this.clientRepository.updateClientInMongo(client)
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = ActionWalletDomain
