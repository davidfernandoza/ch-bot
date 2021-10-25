'use strict'
const Repository = require('./Repository')

class TermRepository extends Repository {
	constructor({ Config }) {
		super(Config)
		this.prefix = 'terms'
	}

	async getDefaultTerm() {
		return await super.get(`${this.prefix}/default`)
	}
}

module.exports = TermRepository
