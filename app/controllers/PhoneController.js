'use strict'

class PhoneController {
	constructor({ ErrorHandler, PhoneDomain, PhoneChat, MenuChat }) {
		this.errorHandler = ErrorHandler
		this.phoneDomain = PhoneDomain
		this.phoneChat = PhoneChat
		this.menuChat = MenuChat
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
				await this.phoneChat.setPhoneCorrectly(CTX)
				return this.menuChat.openMenu(CTX)
			} else throw new Error('Error in setPhoneToClient method')
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}
}
module.exports = PhoneController
