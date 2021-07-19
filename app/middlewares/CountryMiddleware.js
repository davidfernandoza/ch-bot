'use strict'

class CountryMiddleware {
	constructor({ ClientRepository, DefaultString }) {
		this.clientRepository = ClientRepository
		this.defaultString = DefaultString
	}

	async getCountryValidate(CTX) {
		try {
			const telegramId = CTX.from.id
			CTX.client = await this.clientRepository.getClientByTelegramIdInMongo(
				telegramId
			)
			if (CTX.client.action_bot.action == this.defaultString.GET_COUNTRY) {
				return true
			} else {
				return false
			}
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = CountryMiddleware
