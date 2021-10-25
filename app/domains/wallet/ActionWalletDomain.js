'use strict'

class ActionWalletDomain {
	constructor({
		ClientRepository,
		WalletRepository,
		PlanRepository,
		ClientDomain,
		Config
	}) {
		this.clientRepository = ClientRepository
		this.clientDomain = ClientDomain

		this.walletRepository = WalletRepository
		this.planRepository = PlanRepository
		this.config = Config
	}

	async managerResponseWhenCreatingWallet(clientMongo, dataResponse) {
		await this.clientDomain.assignActionToClient(clientMongo) //Resetea la accion del cliente
		await this.storeNewWalletInMongo(clientMongo, dataResponse)
		return await this.makeDataPrintForConsignmentWallet(clientMongo)
	}

	async resetActionInClientWallet(CTX, action) {
		const actionWallet = !action
			? this.config.STRINGS.CREATE_WALLET
			: this.config.STRINGS[action]

		let actionBot = this.config.STRINGS.GET_WALLET,
			telegramId = CTX.from.id,
			client = await this.clientRepository.getClientByTelegramIdInMongo(
				telegramId
			)
		client = await this.clientDomain.assignActionToClient(client, actionBot)
		return await this.assignActionWallet(client, actionWallet)
	}

	async assignActionWallet(client, actionWallet) {
		client.wallet.action_wallet = actionWallet
		return await this.clientRepository.updateClientInMongo(client)
	}
}

module.exports = ActionWalletDomain
