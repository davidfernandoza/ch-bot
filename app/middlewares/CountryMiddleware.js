'use strict'

class CountryMiddleware {
	constructor({
		InfoValidate,
		ClientRepository,
		DefaultString,
		CountryController
	}) {
		this.InfoValidate = InfoValidate
		this.clientRepository = ClientRepository
		this.defaultString = DefaultString
		this.countryController = CountryController
	}

	async getCountryValidate(CTX) {
		try {
			const telegramId = CTX.from.id
			CTX.client = await this.clientRepository.getClientByTelegramIdInMongo(
				telegramId
			)
			if (CTX.client.action_bot.action == this.defaultString.GET_COUNTRY) {
				return true
			}
		} catch (error) {
			throw new Error(error)
		}
		await this.countryController.getAllCountries(CTX)
		return false
	}
}
module.exports = CountryMiddleware
