'use strict'

class ClientController {
	constructor({
		ClientDomain,
		BuildClientDomain,
		ClientChat,
		ErrorHandler,
		WalletController
	}) {
		this.clientDomain = ClientDomain
		this.buildClientDomain = BuildClientDomain
		this.errorHandler = ErrorHandler
		this.walletController = WalletController
		this.clientChat = ClientChat
	}

	async storeClient(CTX, sponsorId) {
		try {
			const backClientData = await this.buildClientDomain.makeBackUser(
					CTX,
					sponsorId
				),
				clientInBack = await this.clientDomain.storeClientInBack(
					backClientData
				),
				mongoClientData = await this.buildClientDomain.makeMongoUser(
					clientInBack,
					sponsorId
				)
			await this.clientDomain.storeClientInMongo(mongoClientData)
			await this.clientChat.succesNewClient(CTX)
			return await this.walletController.assingWalletAction(CTX)
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}
}
module.exports = ClientController
