'use strict'

module.exports = class PaymentController {
	constructor({ ErrorHandler, PaymentDomain }) {
		this.errorHandler = ErrorHandler
		this.paymentDomain = PaymentDomain
	}

	async getBalance(CTX) {
		try {
			return await this.paymentDomain.getPaymentBalance(CTX)
		} catch (error) {
			this.errorHandler.sendError(CTX, error)
		}
	}

	async validateCollectBalance(CTX) {
		try {
			return await this.paymentDomain.validateCollectBalance(CTX)
		} catch (error) {
			this.errorHandler.sendError(CTX, error)
		}
	}
	async collectBalance(CTX) {
		try {
			return await this.paymentDomain.collectBalance(CTX)
		} catch (error) {
			this.errorHandler.sendError(CTX, error)
		}
	}
	async getPaymentHistory(CTX) {
		try {
			return await this.paymentDomain.getPaymentHistory(CTX)
		} catch (error) {
			this.errorHandler.sendError(CTX, error)
		}
	}
}
