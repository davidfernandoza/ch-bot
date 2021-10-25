'use strict'

class CountryMiddleware {
	constructor({ ClientRepository, DefaultString, ValidateChat }) {
		this.clientRepository = ClientRepository
		this.defaultString = DefaultString
		this.validateChat = ValidateChat
	}

	async getCountryValidate(CTX) {
		const telegramId = CTX.from.id
		CTX.client = await this.clientRepository.getClientByTelegramIdInMongo(
			telegramId
		)
		if (CTX.client.action_bot.action == this.defaultString.GET_COUNTRY) {
			return true
		} else {
			return false
		}
	}

	async countryExist(CTX) {
		const telegramId = CTX.from.id
		CTX.client = await this.clientRepository.getClientByTelegramIdInMongo(
			telegramId
		)
		if (CTX.client.country.name) {
			return true
		}
		await this.validateChat.countryNotExist(CTX)
		return false
	}
}
module.exports = CountryMiddleware
