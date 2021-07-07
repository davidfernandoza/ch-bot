'use strict'

class InfoMiddleware {
	constructor({ InfoValidate }) {
		this.InfoValidate = InfoValidate
	}

	async infoExistValidate(CTX) {
		try {
			return await this.InfoValidate.clientWithInfoValidate(CTX)
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = InfoMiddleware
