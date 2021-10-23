'use strict'

class PlanDomain {
	constructor({ PlanRepository, ClientDomain, ValidateChat }) {
		this.planRepository = PlanRepository
		this.clientDomain = ClientDomain
		this.validateChat = ValidateChat
	}

	async getValuePlanByClientManager(CTX, client) {
		try {
			const planValue = await this.planRepository.getValuePlanByClient(
				client.client_id
			)
			if (planValue.status == 'COMPANY') {
				await this.clientDomain.companyStatusManger(CTX)
				throw new Error()
			}
			return planValue.value
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = PlanDomain
