'use strict'

class ClientDomain {
	constructor({ ClientRepository }) {
		this.clientRepository = ClientRepository
	}

	async assignAction(client, action, step) {
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

	makeBackUser(data) {
		try {
			if (!data.sponsor) {
				throw new Error({ method: makeBackUser.name, data: data.sponsor })
			}
			return {
				telegram_id: data.client.id,
				sponsor_id: data.sponsor.id,
				full_name: `${data.client.first_name} ${data.client.last_name}`,
				username: `${data.client.username}`,
				plan_id: data.plan.id
			}
		} catch (error) {
			throw new Error(error)
		}
	}

	makeMongoUser(clientData, sponsorTelegramId) {
		try {
			if (!clientData) {
				throw new Error({ method: makeMongoUser.name, data: clientData })
			}
			return {
				...clientData,
				client_id: clientData.id,
				action_bot: { action: 'GET_WALLET' },
				sponsor_telegram_id: sponsorTelegramId
			}
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = ClientDomain
