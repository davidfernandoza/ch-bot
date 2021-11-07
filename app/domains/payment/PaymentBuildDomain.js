'use strict'

module.exports = class PaymentBuildDomain {
	buildBalance(paymentsList) {
		let value = 0.0
		if (!paymentsList) return value

		paymentsList.forEach(payment => {
			value += parseFloat(payment.value)
		})
		return value
	}
}
