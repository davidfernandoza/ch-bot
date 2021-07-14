'use strict'
const Repository = require('./Repository')

class CountryRepository extends Repository {
	constructor({ Config }) {
		super(Config)
		this.prefix = 'countries'
	}

	async getAllCountries(accessToken) {
		try {
			return await super.get(`${this.prefix}/`, accessToken)
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = CountryRepository
