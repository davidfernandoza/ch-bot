'use strict'

class TermsAndPlandChat {
	constructor({ MessageString }) {
		this.messageString = MessageString
	}

	async printTerm(CTX, dataPrint) {
		try {
			await CTX.replyWithMarkdown('*Terminos y condiciones:*')
			return await CTX.replyWithMarkdown(dataPrint.dataTerm.description)
		} catch (error) {
			throw new Error(error)
		}
	}

	async printPlan(CTX, dataPrint) {
		try {
			await CTX.replyWithMarkdown('*Plan de pagos:*')
			return await CTX.replyWithMarkdown(dataPrint.dataPlan.term.description)
		} catch (error) {
			throw new Error(error)
		}
	}
	async printMatrix(CTX, dataPrint) {
		try {
			await CTX.replyWithMarkdown('*Matriz forzada:*')
			return await CTX.replyWithMarkdown(dataPrint.dataMatrix.description)
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = TermsAndPlandChat
