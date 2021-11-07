'use strict'

module.exports = class PaymentDomain {
	constructor({
		ClientRepository,
		PlanRepository,
		PaymentBuildDomain,
		PaymentRepository,
		PaymentChat
	}) {
		this.clientRepository = ClientRepository
		this.paymentRepository = PaymentRepository
		this.paymentChat = PaymentChat
		this.paymentBuildDomain = PaymentBuildDomain
		this.planRepository = PlanRepository
	}

	async getPaymentBalance(CTX) {
		const paymentsAndPlan = await this.getPaymentAndPlanForCompare(CTX)
		const value = this.paymentBuildDomain.buildBalance(paymentsAndPlan[0])
		return await this.printValueForPayAPlan(CTX, value, paymentsAndPlan[1])
	}

	async printValueForPayAPlan(CTX, value, plan) {
		const planValue = parseFloat(plan.consignment_value)
		if (value >= planValue) {
			return await this.paymentChat.printBalanceWithPayPlan(CTX, value)
		}
		return await this.paymentChat.printBalance(CTX, value)
	}

	async getPaymentAndPlanForCompare(CTX) {
		const telegramId = CTX.from.id
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			telegramId
		)
		const accessToken = client.auth.access_token
		const paymentsPromise = this.paymentRepository.getBalanceByUser(
			client.client_id,
			accessToken
		)
		const planPromise = this.planRepository.getPlan(client.plan_id)
		return await Promise.all([paymentsPromise, planPromise])
	}
}
