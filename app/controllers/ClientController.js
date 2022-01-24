'use strict'
const errorApi = 'ERR422'
class ClientController {
	constructor({
		ClientDomain,
		BuildClientDomain,
		ClientChat,
		ErrorHandler,
		WalletController,
		ClientReferralsChat,
		StatusClientDomain
	}) {
		this.clientDomain = ClientDomain
		this.buildClientDomain = BuildClientDomain
		this.errorHandler = ErrorHandler
		this.walletController = WalletController
		this.clientChat = ClientChat
		this.clientReferralsChat = ClientReferralsChat
		this.statusClientDomain = StatusClientDomain
	}

	async storeClient(CTX, sponsorId) {
		try {
			const backClientData = await this.buildClientDomain.makeBackUser(
				CTX,
				sponsorId
			)
			const clientInBack = await this.clientDomain.storeClientInBack(
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

	async showClientInfo(CTX) {
		try {
			const client = await this.clientDomain.showClientInfo(CTX)
			this.clientReferralsChat.printClient(CTX, client)
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}

	async activeInfoClientByAPI(req, res) {
		try {
			const telegramId = req.body.telegram_id
			if (await this.statusClientDomain.addInfoActiveClient(telegramId)) {
				return res.status(200).send()
			} else throw new Error(errorApi)
		} catch (error) {
			if (error.message == errorApi) {
				return this.errorHandler.api({ message: errorApi }, req, res, null)
			}
			throw new Error(error)
		}
	}

	async changeStatusByClientListAPI(req, res) {
		try {
			const clients = req.body
			this.statusClientDomain.changeStatusForClientArray(clients)
			return res.status(200).send({ clients: true })
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = ClientController
