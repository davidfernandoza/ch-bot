'use strict'
const validate = require('validate.js')

class EmailMiddleware {
	constructor({ ClientRepository, ValidateChat }) {
		this.clientRepository = ClientRepository
		this.validateChat = ValidateChat
	}

	async emailValidate(CTX) {
		try {
			const emailObject = { email: CTX.message.text },
				rules = {
					email: {
						email: true
					}
				}
			if (await validate(emailObject, rules)) {
				await this.validateChat.isNotEmail(CTX)
				return false
			}
			return true
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = EmailMiddleware
