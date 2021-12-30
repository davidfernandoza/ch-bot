'use strict'

const moment = require('moment')
class PaymentHistoryChat {
	constructor({ MessageString, DefaultString }) {
		this.plan_value = 0
		this.messageString = MessageString
		this.defaultString = DefaultString
	}

	async showPaymentHistory(CTX, payments) {
		/*
		 * Payments
		 */
		this.plan_value = parseFloat(payments.plan_value)
		if (payments.payments.length > 0) {
			await CTX.replyWithMarkdown(
				this.messageString.historicPaymentDeliveredTitleMessage
			)
			let index = 1
			if (payments.payments.length >= 6) {
				index = parseInt(payments.count_payment) - 5
			}
			for (const payment of payments.payments) {
				await CTX.replyWithMarkdown(
					this.makeMessageWithInfoToPayment(payment, index)
				)
				index++
			}
		} else {
			await CTX.replyWithMarkdown(this.messageString.notHavePaymentsMessage)
		}

		// Pending Payments
		if (payments.processing.length > 0) {
			await CTX.replyWithMarkdown(
				this.messageString.historicPaymentProcessingTitleMessage
			)

			for (const payment of payments.processing) {
				await CTX.replyWithMarkdown(
					await this.makeMessageWithPendingPaymentInfo(payment)
				)
			}
		}
		return
	}

	makeMessageWithPendingPaymentInfo(payment) {
		let message = this.messageString.historicPendingPaymentMessage
		message = message.replace('#VALUE', payment.value)
		message = message.replace(
			'#DATE',
			moment(payment.updated_at).format('YYYY-MM-DD')
		)
		return message
	}

	makeMessageWithInfoToPayment(payment, code) {
		const type = this.selectType(payment)
		const status_type = this.defaultString.HISTORY_TYPES.BALANCE
		if (type == status_type) return this.buildForBalance(payment, code, type)
		else return this.buildForPayment(payment, code, type)
	}

	selectType(payment) {
		if (payment.consignment_id) return this.defaultString.HISTORY_TYPES.BALANCE
		else return this.defaultString.HISTORY_TYPES.PAYMENT
	}

	buildForBalance(payment, code, type) {
		let message = this.messageString.historicConsignmentMessage
		message = message.replace('#CODE', code)
		message = message.replace('#TYPE', type)
		message = message.replace('#VALUE', payment.value)
		message = message.replace('#PERIOD_VALUE', this.plan_value)
		message = message.replace(
			'#CHANGE',
			parseFloat(payment.value) - this.plan_value
		)
		message = message.replace(
			'#DATE',
			moment(payment.datetime).format('YYYY-MM-DD')
		)
		return message
	}

	buildForPayment(payment, code, type) {
		let message = this.messageString.historicPaymentMessage
		message = message.replace('#CODE', code)
		message = message.replace('#TYPE', type)
		message = message.replace('#VALUE', payment.value)
		message = message.replace('#ADDRESS', payment.wallet.key)
		message = message.replace(
			'#DATE',
			moment(payment.datetime).format('YYYY-MM-DD')
		)
		return message
	}
}
module.exports = PaymentHistoryChat
