'use strict'

class BuildClientDomain {
	constructor({ ClientRepository, PlanRepository }) {
		this.clientRepository = ClientRepository
		this.planRepository = PlanRepository
	}

	async makeBackUser(CTX, sponsorTelegramId) {
		const client = CTX.from,
			plan = await this.planRepository.getDefaultPlan(),
			sponsor = await this.clientRepository.getClientInBackByTelegramId(
				sponsorTelegramId
			)

		if (!sponsor) {
			throw new Error(
				JSON.stringify({ method: this.makeBackUser.name, data: sponsor })
			)
		}

		return {
			telegram_id: client.id,
			sponsor_id: sponsor.id,
			full_name: this.createNameClient(client),
			plan_id: plan.id
		}
	}

	createNameClient(client) {
		if (client.first_name && client.last_name) {
			return `${client.first_name} ${client.last_name}`
		} else if (client.first_name) return `${client.first_name}`
		else if (client.last_name) return `${client.last_name}`
		else return 'N-A'
	}

	makeMongoUser(clientData, sponsorTelegramId) {
		if (!clientData) {
			throw new Error({ method: makeMongoUser.name, data: clientData })
		}
		return {
			...clientData,
			client_id: clientData.id,
			action_bot: { action: 'GET_WALLET' },
			sponsor_telegram_id: sponsorTelegramId
		}
	}
}

module.exports = BuildClientDomain
