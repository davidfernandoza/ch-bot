'use strict'

class TermDomain {
	constructor({ TermRepository, PlanRepository, MatixRepository }) {
		this.termRepository = TermRepository
		this.planRepository = PlanRepository
		this.matixRepository = MatixRepository
	}

	async makeDataPrintForPlan() {
		return {
			dataPlan: await this.planRepository.getDefaultPlan()
		}
	}
	async makeDataPrintForTerm() {
		return {
			dataTerm: await this.termRepository.getDefaultTerm()
		}
	}
	async makeDataPrintForMatrix() {
		return {
			dataMatrix: await this.matixRepository.getDefaultMatrix()
		}
	}
}

module.exports = TermDomain
