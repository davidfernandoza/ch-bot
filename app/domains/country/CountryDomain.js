'use strict'

class CountryDomain {
	constructor({
		CountryRepository,
		ClientRepository,
		DefaultString,
		ClientDomain
	}) {
		this.countryRepository = CountryRepository
		this.clientRepository = ClientRepository
		this.defaultString = DefaultString
		this.clientDomain = ClientDomain
	}

	async getAllCountries(CTX) {
		const countries = await this.countryRepository.getAllCountries(
				CTX.accessToken
			),
			client = CTX.client
		if (countries.length > 0) {
			client.action_bot.action = this.defaultString.GET_COUNTRY
			await this.clientRepository.updateClientInMongo(client)
			return countries
		} else throw new Error('Not Countries')
	}

	async setCountryForClient(CTX, countryId) {
		const client = CTX.client,
			backClient = await this.clientRepository.setCountryForClient(
				client.client_id,
				countryId,
				CTX.accessToken
			)

		client.country = {
			...backClient.country,
			characters_phone: parseInt(backClient.country.characters_phone)
		}

		client.action_bot.action = 'NONE'
		await this.clientRepository.updateClientInMongo(client)
		return true
	}
}

module.exports = CountryDomain
