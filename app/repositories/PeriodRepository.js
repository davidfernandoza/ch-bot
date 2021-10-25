'use strict'
const Repository = require('./Repository')

class PeriodRepository extends Repository {
	constructor({ Config }) {
		super(Config)
		this.prefix = 'periods'
	}

	async getAllClientPeriods(client) {
		return await super.get(`${this.prefix}/get-by-client/${client.client_id}`)
	}
}

module.exports = PeriodRepository
