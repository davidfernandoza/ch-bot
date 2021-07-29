'use strict'

class AvailableCodeMiddleware {
	constructor({ Config }) {
		this.config = Config
	}

	async codeValidate(req, res, next) {
		try {
			if (!req.headers.origin_client_code) return res.status(422).send()
			if (req.headers.origin_client_code != this.config.ORIGIN_CLIENT_CODE) {
				return res.status(422).send()
			}
			next()
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = AvailableCodeMiddleware
