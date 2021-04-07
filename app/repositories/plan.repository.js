'use strict'
const RepositoryAPI = require('./repository-api')

class PlanRepository extends RepositoryAPI {
	constructor({ Config }) {
		super(Config)
		this.prefix = 'plans'
	}

	async getDefaultPlan() {
		try {
			return await super.get(`${this.prefix}/default`)
		} catch (error) {
			throw new Error(error)
		}
	}

	async getPlan(planId) {
		try {
			return await super.get(`${this.prefix}/get-by-id/${planId}`)
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = PlanRepository
