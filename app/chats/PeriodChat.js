'use strict'

const moment = require('moment')
class PeriodChat {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async sendPeriodStatusMessage(CTX, periods) {
		try {
			if (periods.periods.length > 1) {
				// Historic Title
				await CTX.replyWithMarkdown(
					this.messageString.historicPeriodTitleMessage
				)

				// Historic
				for (const period of periods.periods) {
					await CTX.replyWithMarkdown(
						await this.makeMessageWithInfoToPeriod(
							period,
							periods.current_period
						)
					)
				}
			} else {
				await CTX.replyWithMarkdown(this.messageString.notHavePeriodMessage)
			}

			// Current Period
			await CTX.replyWithMarkdown(
				this.messageString.statusClientPeriodTitleMessage
			)
			return await CTX.replyWithMarkdown(
				await this.makeMessageWithInfoToStatePeriod(
					periods.periods,
					periods.current_period
				)
			)
		} catch (error) {
			throw new Error(error)
		}
	}

	async makeMessageWithInfoToStatePeriod(periods, current_period) {
		return new Promise((resolve, reject) => {
			try {
				let message = this.messageString.statusClientInPeriodMessage
				message = message.replace('#CODE', current_period.code)
				message = message.replace('#DATE_IN', current_period.start_date)
				message = message.replace('#DATE_OUT', current_period.end_date)
				message = message.replace(
					'#CLIENT_STATUS',
					this.getStatusForClient(periods, current_period)
				)
				resolve(message)
			} catch (error) {
				reject(error)
			}
		})
	}

	async makeMessageWithInfoToPeriod(period, current_period) {
		return new Promise((resolve, reject) => {
			try {
				let message = this.messageString.historicPeriodMessage
				message = message.replace('#CODE', period.code)
				message = message.replace('#DATE_IN', period.start_date)
				message = message.replace('#DATE_OUT', period.end_date)
				message = message.replace(
					'#CONSIGNMENTS_AMOUNT',
					period.consignments.length
				)
				message = message.replace(
					'#STATUS',
					this.getStatus(period, current_period)
				)
				resolve(message)
			} catch (error) {
				reject(error)
			}
		})
	}

	getStatus(period, current_period) {
		try {
			const date_one = moment(period.start_date).format('YYYY-MM-DD')
			const date_two = moment(current_period.start_date).format('YYYY-MM-DD')
			if (date_one < date_two) {
				return 'CERRADO'
			} else if (date_one > date_two) {
				return 'EN ESPERA'
			} else {
				return 'ACTIVO'
			}
		} catch (error) {
			throw new Error(error)
		}
	}

	getStatusForClient(periods, current_period) {
		let status = 'INACTIVO'
		const date_one = moment(current_period.start_date).format('YYYY-MM-DD')
		for (const period of periods) {
			const date_tow = moment(period.start_date).format('YYYY-MM-DD')
			if (date_one == date_tow) {
				status = 'ACTIVO'
			}
		}
		return status
	}
}
module.exports = PeriodChat
