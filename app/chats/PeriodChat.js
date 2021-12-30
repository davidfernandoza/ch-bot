'use strict'

const moment = require('moment')
class PeriodChat {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async sendPeriodStatusMessage(CTX, periods) {
		// Historic
		if (periods.periods.length > 0) {
			// Historic Title
			await CTX.replyWithMarkdown(this.messageString.historicPeriodTitleMessage)
			for (const period of periods.periods) {
				await CTX.replyWithMarkdown(
					this.makeMessageWithInfoToPeriod(period, periods.current_period)
				)
			}
		} else {
			await CTX.replyWithMarkdown(this.messageString.notHavePeriodMessage)
		}

		// Current Period
		await CTX.replyWithMarkdown(
			this.messageString.statusClientPeriodTitleMessage
		)
		const message = this.makeMessageWithInfoToStatePeriod(
			periods.periods,
			periods.current_period
		)
		await CTX.replyWithMarkdown(message)

		// Debt Periods
		if (periods.debt_periods.length > 0) {
			await CTX.replyWithMarkdown(this.messageString.debtPeriodTitleMessage)
			for (const period of periods.debt_periods) {
				await CTX.replyWithMarkdown(this.makeMessageDebtPeriod(period))
			}
		} else {
			await CTX.replyWithMarkdown(this.messageString.notHavePeriodMessage)
		}
		return
	}

	makeMessageDebtPeriod(period) {
		let message = this.messageString.debtPeriodMessage
		message = message.replace('#CODE', period.code)
		message = message.replace('#DATE_IN', period.start_date)
		message = message.replace('#DATE_OUT', period.end_date)
		return message
	}

	makeMessageWithInfoToStatePeriod(periods, current_period) {
		let message = this.messageString.statusClientInPeriodMessage
		message = message.replace('#CODE', current_period.code)
		message = message.replace('#DATE_IN', current_period.start_date)
		message = message.replace('#DATE_OUT', current_period.end_date)
		message = message.replace(
			'#CLIENT_STATUS',
			this.getStatusForClient(periods, current_period)
		)
		return message
	}

	makeMessageWithInfoToPeriod(period, current_period) {
		let message = this.messageString.historicPeriodMessage
		message = message.replace('#CODE', period.code)
		message = message.replace('#DATE_IN', period.start_date)
		message = message.replace('#DATE_OUT', period.end_date)
		message = message.replace('#STATUS', this.getStatus(period, current_period))
		message = message.replace(
			'#CONSIGNMENTS_AMOUNT',
			period.consignments[0].transactions.length
		)
		return message
	}

	getStatus(period, current_period) {
		const date_one = moment(period.start_date).format('YYYY-MM-DD')
		const date_two = moment(current_period.start_date).format('YYYY-MM-DD')
		if (date_one < date_two) return 'CERRADO'
		else if (date_one > date_two) return 'EN ESPERA'
		else return 'ACTIVO'
	}

	getStatusForClient(periods, current_period) {
		let status = 'INACTIVO'
		const date_one = moment(current_period.start_date).format('YYYY-MM-DD')
		for (const period of periods) {
			const date_tow = moment(period.start_date).format('YYYY-MM-DD')
			if (date_one == date_tow) status = 'ACTIVO'
		}
		return status
	}
}
module.exports = PeriodChat
