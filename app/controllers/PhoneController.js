'use strict'

class PhoneController {
	constructor({ ErrorHandler, PhoneDomain, PhoneChat }) {
		this.errorHandler = ErrorHandler
		this.phoneDomain = PhoneDomain
		this.phoneChat = PhoneChat
	}

	async setActionForGetPhone(CTX) {
		try {
			await this.phoneDomain.setActivePhoneStatus(CTX)
			return this.phoneChat.getPhoneMessage(CTX)
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}

	async setPhoneToClient(CTX) {
		try {
			if (await this.phoneDomain.setPhoneForClient(CTX)) {
				return await this.phoneChat.setPhoneCorrectly(CTX)
			} else throw new Error('Error in setPhoneToClient method')
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}
}
module.exports = PhoneController
