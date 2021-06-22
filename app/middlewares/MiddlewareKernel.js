'use strict'

const { response } = require('express')

class MiddlewareKernel {
	constructor({ ClientMiddleware, WalletMiddleware, AuthMiddleware }) {
		this.middlewaresList = {
			ClientMiddleware,
			WalletMiddleware,
			AuthMiddleware
		}
	}

	async routerToMiddleware(data) {
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
	}
}
module.exports = MiddlewareKernel
