'use strict'
const Repository = require('./Repository')

class MatixRepository extends Repository {
	constructor({ Config }) {
		super(Config)
		this.prefix = 'matrix'
	}

	async getDefaultMatrix() {
		try {
			return await super.get(`${this.prefix}/default`)
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = MatixRepository
