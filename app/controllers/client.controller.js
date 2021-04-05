'use strict'

class ClientController {
	constructor({
		ClientRepository,
		ClientDomain,
		ClientView,
		ErrorHandler,
		PlanRepository,
		WalletController
	}) {
		this.clientDomain = ClientDomain
		this.clientRepository = ClientRepository
		this.planRepository = PlanRepository
		this.errorHandler = ErrorHandler
		this.walletController = WalletController
		this.clientView = ClientView
	}

	async storeClient(CTX) {
		try {
			const backClient = this.clientDomain.makeBackUser({
					client: CTX.from,
					plan: await this.planRepository.getDefaultPlan(),
					sponsor: await this.clientRepository.getClientInBackByTelegramId(
						CTX.sponsorTelegramId
					)
				}),
				mongoClient = this.clientDomain.makeMongoUser(
					await this.clientRepository.storeClientInBack(backClient),
					CTX.sponsorTelegramId
				)
			await this.clientRepository.storeClientInMongo(mongoClient)
			await this.clientView.succesNewClient(CTX)
			return await this.walletController.resetActionInClientWallet(CTX)
		} catch (error) {
			this.errorHandler.sendError(CTX, error)
		}
	}
}
module.exports = ClientController
