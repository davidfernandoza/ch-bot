'use strict'
const moment = require('moment')

class ClientMiddleware {
	constructor({ ClientRepository, ValidateChat, StatusClientDomain }) {
		this.validateChat = ValidateChat
		this.clientRepository = ClientRepository
		this.statusClientDomain = StatusClientDomain
	}

	// Si existe retorna True
	async clientExistValidate(CTX) {
		const telegramId = CTX.from.id
		return await this.clientExistByTelegramId(CTX, telegramId, false)
	}

	// Si no existe retorna True
	async clientNotExistValidate(CTX) {
		const telegramId = CTX.from.id
		return await this.clientExistByTelegramId(CTX, telegramId, true)
	}

	async clientIsCompany(CTX) {
		const telegramId = CTX.from.id
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			telegramId
		)
		if (!client) return true
		if (client.status == 'COMPANY') {
			await this.validateChat.clientIsCompanyStatus(CTX)
			return false
		}
		return true
	}

	async clientExistByTelegramId(CTX, telegramId, isExist) {
		const response = await this.clientRepository.getClientByTelegramIdInMongo(
			telegramId
		)
		if (isExist && response) return await this.failResponse(CTX, 'clientExist')
		else if (!isExist && !response)
			return await this.failResponse(CTX, 'clientNotExist')
		return true
	}

	async validateAmountOfActiveReferrals(CTX) {
		const telegramId = CTX.from.id
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			telegramId
		)
		const referralsAmount =
			await this.clientRepository.getAmountOfActiveReferralsByClient(
				client.client_id,
				client.auth.access_token
			)
		if (parseInt(referralsAmount) >= 3) return true
		return await this.failResponse(CTX, 'referralsAreMissing')
	}

	async failResponse(CTX, fileType) {
		await this.validateChat[fileType](CTX)
		return false
	}

	async inactiveClient(CTX) {
		const telegramId = CTX.from.id
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			telegramId
		)

		if (
			moment(client.period).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')
		) {
			await this.statusClientDomain.addInactiveClient(client)
		}

		if (client.status == 'INCOMPLETE') {
			await this.validateChat.incompleteClient(CTX)
		} else if (client.status == 'INACTIVE') {
			await this.validateChat.inactiveClient(CTX)
		}
		return true
	}
}

module.exports = ClientMiddleware
