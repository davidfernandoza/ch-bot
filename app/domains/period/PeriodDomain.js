'use strict'

class PeriodDomain {
	constructor({ PeriodRepository, DefaultString }) {
		this.periodRepository = PeriodRepository
		this.defaultString = DefaultString
	}

	async getStatusToPeriod(CTX) {
		try {
			const client = CTX.client
			return this.periodRepository.getAllClientPeriods(client)
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = PeriodDomain
