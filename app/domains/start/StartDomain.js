'use strict'

class StartDomain {
	constructor({ TermRepository, PlanRepository }) {
		this.termRepository = TermRepository
		this.planRepository = PlanRepository
	}

	async makeDataPrint(CTX) {
		try {
			return {
				dataTerm: await this.termRepository.getDefaultTerm(),
				dataPlan: await this.planRepository.getDefaultPlan(),
				sponsorTelegramId: CTX.update.message.sponsorId
			}
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = StartDomain
