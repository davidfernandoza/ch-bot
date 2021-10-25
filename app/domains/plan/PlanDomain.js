'use strict'

class PlanDomain {
	constructor({ PlanRepository, ClientDomain, ValidateChat }) {
		this.planRepository = PlanRepository
		this.clientDomain = ClientDomain
		this.validateChat = ValidateChat
	}

	async getValuePlanByClientManager(CTX, client) {
		const planValue = await this.planRepository.getValuePlanByClient(
			client.client_id
		)
		return planValue.value
	}
}

module.exports = PlanDomain
