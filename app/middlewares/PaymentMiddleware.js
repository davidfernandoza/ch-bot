'use strict'

module.exports = class PaymentMiddleware {
	constructor({ ValidateChat, PaymentDomain, PaymentBuildDomain }) {
		this.validateChat = ValidateChat
		this.paymentDomain = PaymentDomain
		this.paymentBuildDomain = PaymentBuildDomain
	}

	async valueBalanceCompleteForPayAPlan(CTX) {
		const paymentAndPlanArray =
			await this.paymentDomain.getPaymentAndPlanForCompare(CTX)
		const value = this.paymentBuildDomain.buildBalance(paymentAndPlanArray[0])
		const planValue = parseFloat(paymentAndPlanArray[1].value)
		if (value < planValue) {
			await this.validateChat.balanceWithoutFunds(CTX)
			return false
		}
		if (planValue == 0) {
			await this.validateChat.haveNotTransactions(CTX)
			return false
		}
		return true
	}
}
