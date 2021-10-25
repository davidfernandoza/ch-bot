'use strict'

class TermsAndPlandChat {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async printTerm(CTX, dataPrint) {
		await CTX.replyWithMarkdown('*Terminos y condiciones:*')
		return await CTX.replyWithMarkdown(dataPrint.dataTerm.description)
	}

	async printPlan(CTX, dataPrint) {
		await CTX.replyWithMarkdown('*Plan de pagos:*')
		return await CTX.replyWithMarkdown(dataPrint.dataPlan.term.description)
	}
	async printMatrix(CTX, dataPrint) {
		await CTX.replyWithMarkdown('*Matriz forzada:*')
		return await CTX.replyWithMarkdown(dataPrint.dataMatrix.description)
	}
}
module.exports = TermsAndPlandChat
