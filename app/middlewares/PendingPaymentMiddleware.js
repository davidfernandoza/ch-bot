'use strict'

module.exports = class PendingPaymentMiddleware {
	constructor({
		ValidateChat,
		ClientRepository,
		PaymentDomain,
		PaymentBuildDomain
	}) {
		this.validateChat = ValidateChat
		this.clientRepository = ClientRepository
		this.paymentDomain = PaymentDomain
		this.paymentBuildDomain = PaymentBuildDomain
	}

	async countCharges(CTX) {
		const telegramId = CTX.from.id
		const user = await this.clientRepository.getClientByTelegramIdInMongo(
			telegramId
		)

		if (parseInt(user.charges_amount) >= 2) {
			await this.validateChat.limitCharges(CTX)
			return false
		}
		return true
	}

	async balanceValidateForCharges(CTX) {
		const paymentAndPlanArray =
			await this.paymentDomain.getPaymentAndPlanForCompare(CTX)
		const value = this.paymentBuildDomain.buildBalance(paymentAndPlanArray[0])
		if (parseFloat(value) > 0) return true
		await this.validateChat.balanceWithoutFundsForCharges(CTX)
		return false
	}
}
