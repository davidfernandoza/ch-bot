'use strict'
const Repository = require('./Repository')

class CountryRepository extends Repository {
	constructor({ Config }) {
		super(Config)
		this.prefix = 'countries'
	}

	async getAllCountries(accessToken) {
		return await super.get(`${this.prefix}/`, accessToken)
	}
}

module.exports = CountryRepository
