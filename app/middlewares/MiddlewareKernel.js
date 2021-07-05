'use strict'

const { response } = require('express')

class MiddlewareKernel {
	constructor({
		ClientMiddleware,
		WalletMiddleware,
		AuthMiddleware,
		ErrorHandler
	}) {
		this.errorHandler = ErrorHandler
		this.middlewaresList = {
			ClientMiddleware,
			WalletMiddleware,
			AuthMiddleware
		}
	}

	async routerToMiddleware(data) {
		try {
			let middlewaresAmount = data.middlewares.length,
				middlewareStep = 1

			return data.middlewares.every(middlewareAndMethod => {
				const middlewareArray = middlewareAndMethod.split('.'),
					middleware = middlewareArray[0],
					method = middlewareArray[1]
				return this.middlewaresList[middleware][method](
					data.request.context
				).then(response => {
					if (!response) return false
					if (middlewareStep >= middlewaresAmount) {
						data.next(data.request.context, data.request.value)
						return true
					}
					middlewareStep++
				})
			})
		} catch (error) {
			this.errorHandler.sendError(data.request.context, error)
			return false
		}
	}
}
module.exports = MiddlewareKernel
