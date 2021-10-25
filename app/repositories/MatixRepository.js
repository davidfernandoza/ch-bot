'use strict'
const Repository = require('./Repository')

class MatixRepository extends Repository {
	constructor({ Config }) {
		super(Config)
		this.prefix = 'matrix'
	}

	async getDefaultMatrix() {
		return await super.get(`${this.prefix}/default`)
	}
}

module.exports = MatixRepository
