'use strict'
const validate = require('validate.js')

class StartMiddleware {
	constructor({ ClientRepository, ValidateChat }) {
		this.validateChat = ValidateChat
		this.clientRepository = ClientRepository
	}

	async sponsorIdValidate(CTX) {
		CTX = this.getSponsorId(CTX)
		let sponsorId = CTX.update.message.sponsorId
		const sponsorValidate = await this.sponsorIdIsNumber(sponsorId)
		if (sponsorValidate) {
			const telegramId = CTX.from.id
			if (parseInt(telegramId) == parseInt(sponsorId)) {
				await this.validateChat.sponsorAndClientIsEquals(CTX)
				return false
			}
			CTX.update.message.sponsorId = parseInt(sponsorId)
			sponsorId = parseInt(sponsorId)
			const backResponse =
				await this.clientRepository.getClientInBackByTelegramId(sponsorId)
			if (backResponse) return true
		}
		await this.validateChat.sponsorNotExist(CTX)
		return false
	}

	getSponsorId(CTX) {
		if (CTX.update.message) {
			const arrayText = CTX.update.message.text.split(' ')
			if (arrayText.length > 1) {
				CTX.update.message.sponsorId = arrayText[1]
				return CTX
			} else {
				CTX.update.message.sponsorId = arrayText[0]
				return CTX
			}
		}
	}

	async sponsorIdIsNumber(sopnsorId) {
		const sponsorObject = { sponsorId: sopnsorId },
			rules = {
				sponsorId: {
					numericality: { strict: true, onlyInteger: true }
				}
			}
		if (await validate(sponsorObject, rules)) {
			return false
		}
		return true
	}
}

module.exports = StartMiddleware
