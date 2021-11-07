module.exports = class ClientErrorManager {
	constructor(ErrorDomain) {
		this.errorDomain = ErrorDomain
	}

	openValidate(error, CTX) {
		const response = error.response
		if (response.status != 422) return false
		if (response.data.status) {
			return this.clientStatusManger(response.data.status, CTX)
		}
		if (response.data.errors) {
			return this.backErrors(response.data.errors, CTX)
		}
		return false
	}

	clientStatusManger(status, CTX) {
		if (status == 'COMPANY') {
			this.errorDomain.clientStatusManger(CTX)
			return true
		}
		if (status == 'INCOMPLETE') {
			this.errorDomain.incompleteStatusManger(CTX)
			return true
		}
		return false
	}

	async backErrors(errorsArray, CTX) {
		if (errorsArray.key) {
			this.errorDomain.walletTaken(CTX)
			return true
		}
		return false
	}
}
