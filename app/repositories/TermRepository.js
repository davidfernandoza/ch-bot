'use strict'
const Repository = require('./Repository')

class TermRepository extends Repository {
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
