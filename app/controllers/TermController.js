'use strict'

class TermController {
	constructor({ ErrorHandler, TermsAndPlandChat, TermDomain }) {
		this.errorHandler = ErrorHandler
		this.termsAndPlandChat = TermsAndPlandChat
		this.termDomain = TermDomain
	}

	async sendPlanText(CTX) {
		try {
			let dataPlanPrint = await this.termDomain.makeDataPrintForPlan(CTX),
				dataMatrixPrint = await this.termDomain.makeDataPrintForMatrix(CTX)
			await this.termsAndPlandChat.printPlan(CTX, dataPlanPrint)
			return this.termsAndPlandChat.printMatrix(CTX, dataMatrixPrint)
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}
	async sendTermText(CTX) {
		try {
			const dataPrint = await this.termDomain.makeDataPrintForTerm(CTX)
			return this.termsAndPlandChat.printTerm(CTX, dataPrint)
		} catch (error) {
			return this.errorHandler.sendError(CTX, error)
		}
	}
}
module.exports = TermController
