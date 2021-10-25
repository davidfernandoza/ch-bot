'use strict'

class StartDomain {
	constructor({ TermDomain, TermRepository, PlanRepository }) {
		this.termRepository = TermRepository
		this.planRepository = PlanRepository
		this.termDomain = TermDomain
	}

	async makeDataPrint(CTX) {
		return {
			...(await this.termDomain.makeDataPrintForPlan()),
			...(await this.termDomain.makeDataPrintForTerm()),
			...(await this.termDomain.makeDataPrintForMatrix()),
			sponsorTelegramId: CTX.update.message.sponsorId
		}
	}
}

module.exports = StartDomain
