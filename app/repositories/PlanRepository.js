'use strict'
const Repository = require('./Repository')

class PlanRepository extends Repository {
	constructor({ Config }) {
		super(Config)
		this.prefix = 'plans'
	}

	async getDefaultPlan() {
		return await super.get(`${this.prefix}/default`)
	}

	async getPlan(planId) {
		return await super.get(`${this.prefix}/get-by-id/${planId}`)
	}

	async getValuePlanByClient(clientId) {
		return await super.get(`${this.prefix}/get-value-plan/client/${clientId}`)
	}
}

module.exports = PlanRepository
