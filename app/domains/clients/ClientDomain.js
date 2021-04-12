'use strict'

class ClientDomain {
	constructor({ ClientRepository, PlanRepository }) {
		this.clientRepository = ClientRepository
		this.planRepository = PlanRepository
	}

	async assignActionToClient(client, action, step) {
		try {
			if (!action) {
				action = 'NONE'
				step = 0
			}
			client.action_bot = { step: step, action: action }
			return await this.clientRepository.updateClientInMongo(client)
		} catch (error) {
			throw new Error(error)
		}
	}

	async storeClientInBack(client) {
		try {
			return await this.clientRepository.storeClientInBack(client)
		} catch (error) {
			throw new Error(error)
		}
	}
	async storeClientInMongo(client) {
		try {
			return await this.clientRepository.storeClientInMongo(client)
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = ClientDomain
