'use strict'
const validate = require('validate.js')

class PhoneMiddleware {
	constructor({ ClientRepository, ValidateChat }) {
		this.clientRepository = ClientRepository
		this.validateChat = ValidateChat
	}

	async phoneValidate(CTX) {
		const phoneObject = { phone: CTX.message.text }
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			CTX.from.id
		)
		const rules = {
			phone: {
				numericality: { onlyInteger: true },
				length: {
					minimum: client.country.characters_phone,
					maximum: client.country.characters_phone + 2
				}
			}
		}
		if (await validate(phoneObject, rules)) {
			await this.validateChat.isNotPhone(CTX)
			return false
		}
		return true
	}
}
module.exports = PhoneMiddleware
