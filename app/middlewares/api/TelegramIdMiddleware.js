'use strict'
const validate = require('validate.js')

class TelegramIdMiddleware {
	constructor({ Config }) {
		this.config = Config
	}

	async telegramIdValidate(req, res, next) {
		try {
			const objectTelegramIdForValidate = { telegram_id: req.body.telegram_id },
				rules = {
					telegram_id: {
						numericality: { onlyInteger: true }
					}
				}
			if (await validate(objectTelegramIdForValidate, rules)) {
				if (!validate.isEmpty(objectTelegramIdForValidate.telegram_id)) {
					return res.status(422).send()
				}
			}
			if (validate.isEmpty(objectTelegramIdForValidate.telegram_id)) {
				return res.status(422).send()
			}

			next()
		} catch (error) {
			throw new Error(errot)
		}
	}
}

module.exports = TelegramIdMiddleware
