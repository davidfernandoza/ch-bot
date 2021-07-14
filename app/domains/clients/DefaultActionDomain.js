'use strict'

class DefaultActionDomain {
	constructor({ ClientRepository, ClientDomain }) {
		this.clientRepository = ClientRepository
		this.clientDomain = ClientDomain
	}

	async actionCancelHandler(CTX) {
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			CTX.from.id
		)
		await this.clientDomain.assignActionToClient(client)
		try {
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = DefaultActionDomain
