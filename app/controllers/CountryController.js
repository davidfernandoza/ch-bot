'use strict'

class CountryController {
	constructor({ CountryDomain, CountryChat, ErrorHandler }) {
		this.countryDomain = CountryDomain
		this.countryChat = CountryChat
		this.errorHandler = ErrorHandler
	}

	async getAllCountries(CTX) {
		try {
			const countriesList = await this.countryDomain.getAllCountries(CTX)
			return await this.countryChat.showCountriesList(CTX, countriesList)
		} catch (error) {
			this.errorHandler.sendError(CTX, error)
		}
	}

	async setCountryForClient(CTX, countryId) {
		try {
			if (await this.countryDomain.setCountryForClient(CTX, countryId)) {
				return await this.countryChat.setCountryCorrectly(CTX)
			} else throw new Error('Error in setCountryForClient method')
		} catch (error) {
			this.errorHandler.sendError(CTX, error)
		}
	}
}
module.exports = CountryController
