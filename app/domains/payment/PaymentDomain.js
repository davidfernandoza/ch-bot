'use strict'

module.exports = class PaymentDomain {
	constructor({
		ClientRepository,
		PlanRepository,
		PaymentBuildDomain,
		PaymentRepository,
		PaymentChat,
		PaymentHistoryChat
	}) {
		this.clientRepository = ClientRepository
		this.paymentRepository = PaymentRepository
		this.paymentChat = PaymentChat
		this.paymentBuildDomain = PaymentBuildDomain
		this.planRepository = PlanRepository
		this.paymentHistoryChat = PaymentHistoryChat
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

	async validateCollectBalance(CTX) {
		const paymentsAndPlan = await this.getPaymentAndPlanForCompare(CTX)
		const value = this.paymentBuildDomain.buildBalance(paymentsAndPlan[0])
		return await this.paymentChat.validationPrintForCollectBalance(CTX, value)
	}

	async collectBalance(CTX) {
		const telegramId = CTX.from.id
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			telegramId
		)
		const accessToken = client.auth.access_token
		const response = await this.paymentRepository.collectBalanceByClient(
			client.client_id,
			accessToken
		)
		const status = response ? 'Enable' : 'Disable'
		return await this.paymentChat.collectBalance(CTX, status)
	}

	async getPaymentAndPlanForCompare(CTX) {
		const telegramId = CTX.from.id
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			telegramId
		)
		const paymentsPromise = this.paymentRepository.getBalanceByClient(
			client.client_id
		)
		const planPromise = this.planRepository.getPlan(client.plan_id)
		return await Promise.all([paymentsPromise, planPromise])
	}

	async getPaymentHistory(CTX) {
		const telegramId = CTX.from.id
		const client = await this.clientRepository.getClientByTelegramIdInMongo(
			telegramId
		)
		const accessToken = client.auth.access_token
		const response = await this.paymentRepository.getPaymentHistoryByClient(
			client.client_id,
			accessToken
		)
		return await this.paymentHistoryChat.showPaymentHistory(CTX, response)
	}
}
