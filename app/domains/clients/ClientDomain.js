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

	showClientInfo(CTX) {
		try {
			const client = CTX.client
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
		} catch (error) {
			throw new Error(error)
		}
	}

	async updateUserInMongo(client) {
		try {
			return await this.clientRepository.updateClientInMongo(client)
		} catch (error) {
			throw new Error(error)
		}
	}

	async companyStatusManger(CTX) {
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			CTX.from.id
		)
		await this.statusClientDomain.addCompanyClient(client)
		await this.validateChat.clientIsCompanyStatus(CTX)
		return false
	}
}

module.exports = ClientDomain
