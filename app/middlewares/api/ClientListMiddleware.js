'use strict'
const validate = require('validate.js')

module.exports = class ClientListMiddleware {
	async emptyArrayValidate(req, res, next) {
		try {
			const objectClientsForValidate = { clients_array: req.body }
			const response = { clients: false }
			if (!validate.isArray(objectClientsForValidate.clients_array)) {
				return res.status(200).send(response)
			}

			if (validate.isEmpty(objectClientsForValidate.clients_array)) {
				return res.status(200).send(response)
			}

			if (!validate.isObject(objectClientsForValidate.clients_array[0])) {
				return res.status(200).send(response)
			}

			next()
		} catch (error) {
			throw new Error(error)
		}
	}
}
