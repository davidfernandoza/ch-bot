'use strict'

class ClientDomain {
	constructor({
		ClientRepository,
		PlanRepository,
		StatusClientDomain,
		ValidateChat
	}) {
		this.clientRepository = ClientRepository
		this.planRepository = PlanRepository
		this.statusClientDomain = StatusClientDomain
		this.validateChat = ValidateChat
	}

	async assignActionToClient(client, action, step) {
		if (!action) {
			action = 'NONE'
			step = 0
		}
		client.action_bot = { step: step, action: action }
		return await this.clientRepository.updateClientInMongo(client)
	}

	async storeClientInBack(client) {
		return await this.clientRepository.storeClientInBack(client)
	}
	async storeClientInMongo(client) {
		return await this.clientRepository.storeClientInMongo(client)
	}

	async showClientInfo(CTX) {
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			CTX.from.id
		)
		return {
			title: 'Mi Información',
			data: {
				full_name: client.full_name ? client.full_name : '*No Existe*',
				status: client.status ? client.status : '*No Existe*',
				phone: client.phone ? client.phone : '*No Existe*',
				country:
					JSON.stringify(client.country) != '{}'
						? client.country
						: '*No Existe*',
				user_email: client.email ? client.email : '*No Existe*'
			}
		}
	}

	async updateUserInMongo(client) {
		return await this.clientRepository.updateClientInMongo(client)
	}
}

module.exports = ClientDomain
