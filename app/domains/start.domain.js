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
				sponsorTelegramId: this.getSponsorTelegramId(CTX)
			}
		} catch (error) {
			throw new Error(error)
		}
	}

	getSponsorTelegramId(CTX) {
		try {
			const arrayText = CTX.update.message.text.split(' ')
			return arrayText.length > 1 ? arrayText[1] : '1ROOT'
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = StartDomain
