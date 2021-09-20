'use strict'

class TermDomain {
	constructor({ TermRepository, PlanRepository, MatixRepository }) {
		this.termRepository = TermRepository
		this.planRepository = PlanRepository
		this.matixRepository = MatixRepository
	}

	async makeDataPrintForPlan() {
		try {
			return {
				dataPlan: await this.planRepository.getDefaultPlan()
			}
		} catch (error) {
			throw new Error(error)
		}
	}
	async makeDataPrintForTerm() {
		try {
			return {
				dataTerm: await this.termRepository.getDefaultTerm()
			}
		} catch (error) {
			throw new Error(error)
		}
	}
	async makeDataPrintForMatrix() {
		try {
			return {
				dataMatrix: await this.matixRepository.getDefaultMatrix()
			}
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = TermDomain
