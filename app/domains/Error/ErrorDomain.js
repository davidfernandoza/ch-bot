'use strict'

module.exports = class ErrorDomain {
	constructor({
		ClientRepository,
		StatusClientDomain,
		ValidateChat,
	}) {
		this.clientRepository = ClientRepository
		this.statusClientDomain = StatusClientDomain
		this.validateChat = ValidateChat
	}

	async companyStatusManger(CTX) {
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			CTX.from.id
		)
		await this.statusClientDomain.addCompanyClient(client)
		await this.validateChat.clientIsCompanyStatus(CTX)
	}

	async walletTaken(CTX) {
		await this.validateChat.walletTaken(CTX)
	}
}
