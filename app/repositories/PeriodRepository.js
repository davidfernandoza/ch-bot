'use strict'
const Repository = require('./Repository')

class PeriodRepository extends Repository {
	constructor({ Config }) {
		super(Config)
		this.prefix = 'periods'
	}

	async getAllClientPeriods(client) {
		try {
			return await super.get(`${this.prefix}/get-by-client/${client.client_id}`)
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = PeriodRepository
