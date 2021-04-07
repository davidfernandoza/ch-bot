'use strict'

class MiddlewareKernel {
	constructor({ ClientMiddleware, WalletMiddleware }) {
		this.middlewaresList = {
			ClientMiddleware,
			WalletMiddleware
		}
	}

	async routerToMiddleware(data) {
		let middlewaresAmount = data.middlewares.length,
			middlewareStep = 0,
			status = false

		data.middlewares.every(middlewareAndMethod => {
			const middlewareArray = middlewareAndMethod.split('.'),
				middleware = middlewareArray[0],
				method = middlewareArray[1]
			if (!this.middlewaresList[middleware][method](data.context)) {
				status = false
				return false
			}

			if (middlewareStep >= middlewaresAmount) {
				status = true
				return false
			}
			middlewareStep++
		})

		if (status) return data.next()
		else return status
	}
}
module.exports = MiddlewareKernel
