'use strict'

class PeriodDomain {
	constructor({
		PeriodRepository,
		DefaultString,
		ClientDomain,
		ClientRepository
	}) {
		this.periodRepository = PeriodRepository
		this.defaultString = DefaultString
		this.clientDomain = ClientDomain
		this.clientRepository = ClientRepository
	}

	async getStatusToPeriod(CTX) {
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			CTX.from.id
		)
		const periods = await this.periodRepository.getAllClientPeriods(client)
		return periods
	}
}

module.exports = PeriodDomain
