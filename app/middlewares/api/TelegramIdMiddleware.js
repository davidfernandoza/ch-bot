'use strict'
const validate = require('validate.js')

class TelegramIdMiddleware {
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
					return res.status(422).send({ id: false })
				}
			}
			if (validate.isEmpty(objectTelegramIdForValidate.telegram_id)) {
				return res.status(422).send({ id: false })
			}

			next()
		} catch (error) {
			throw new Error(error)
		}
	}
}

module.exports = TelegramIdMiddleware
