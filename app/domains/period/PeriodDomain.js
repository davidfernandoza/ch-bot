'use strict'

class PeriodDomain {
	constructor({ PeriodRepository, DefaultString, ClientDomain }) {
		this.periodRepository = PeriodRepository
		this.defaultString = DefaultString
		this.clientDomain = ClientDomain
	}

	async getStatusToPeriod(CTX) {
		const client = CTX.client
		const periods = await this.periodRepository.getAllClientPeriods(client)
		return periods
	}
}

module.exports = PeriodDomain
