'use strict'

class CountryDomain {
	constructor({
		CountryRepository,
		ClientRepository,
		DefaultString,
		ClientDomain
	}) {
		this.clientRepository = ClientRepository
		this.defaultString = DefaultString
		this.clientDomain = ClientDomain
		this.countryRepository = CountryRepository
	}

	async getAllCountries(CTX) {
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			CTX.from.id
		)
		const countries = await this.countryRepository.getAllCountries(
			client.auth.access_token
		)

		if (countries.length > 0) {
			client.action_bot.action = this.defaultString.GET_COUNTRY
			await this.clientRepository.updateClientInMongo(client)
			return countries
		} else throw new Error('Not Countries')
	}

	async setCountryForClient(CTX, countryId) {
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			CTX.from.id
		)
		const backClient = await this.clientRepository.setCountryForClient(
			client.client_id,
			countryId,
			client.auth.access_token
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
