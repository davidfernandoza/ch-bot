'use strict'

class ClientReferralsController {
	constructor({ ErrorHandler, ClientReferralsDomain, ClientReferralsChat }) {
		this.errorHandler = ErrorHandler
		this.clientReferralsDomain = ClientReferralsDomain
		this.clientReferralsChat = ClientReferralsChat
	}

	async getClientReferrals(CTX, value) {
		try {
			const client = await this.clientReferralsDomain.getClientReferrals(
				CTX,
				value
			)
			this.clientReferralsChat.printClient(CTX, client)
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}
}
module.exports = ClientReferralsController
