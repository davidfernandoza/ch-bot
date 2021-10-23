'use strict'

class PeriodDomain {
	constructor({ PeriodRepository, DefaultString, ClientDomain }) {
		this.periodRepository = PeriodRepository
		this.defaultString = DefaultString
		this.clientDomain = ClientDomain
	}

	async getStatusToPeriod(CTX) {
		try {
			const client = CTX.client
			const periods = await this.periodRepository.getAllClientPeriods(client)
			if (periods.status == 'COMPANY') {
				await this.clientDomain.companyStatusManger(CTX)
				throw new Error()
			}
			return periods
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = PeriodDomain
