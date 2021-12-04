'use strict'

module.exports = class PendingPaymentMiddleware {
	constructor({
		ValidateChat,
		ClientRepository,
		PaymentDomain,
		PaymentBuildDomain,
		PaymentRepository
	}) {
		this.validateChat = ValidateChat
		this.clientRepository = ClientRepository
		this.paymentDomain = PaymentDomain
		this.paymentBuildDomain = PaymentBuildDomain
		this.paymentRepository = PaymentRepository
	}

	async countCharges(CTX) {
		const telegramId = CTX.from.id
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			telegramId
		)

		const amount = await this.paymentRepository.getPaymentCountOfPeriodByClient(
			client.client_id,
			client.auth.access_token
		)

		if (parseInt(amount) >= 2) {
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
