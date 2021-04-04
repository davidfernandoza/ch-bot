'use strict'
const RepositoryAPI = require('./repository-api')

class TermRepository extends RepositoryAPI {
	constructor({ Config }) {
		super(Config)
		this.prefix = 'terms'
	}

	async getDefaultTerm() {
		try {
			return await super.get(`${this.prefix}/default`)
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = TermRepository
