'use strict'

class PeriodController {
	constructor({ ErrorHandler, PeriodDomain, PeriodChat }) {
		this.errorHandler = ErrorHandler
		this.periodDomain = PeriodDomain
		this.periodChat = PeriodChat
	}

	async getStatusToPeriod(CTX) {
		try {
			const periods = await this.periodDomain.getStatusToPeriod(CTX)
			return this.periodChat.sendPeriodStatusMessage(CTX, periods)
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}
}
module.exports = PeriodController
