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
			middlewareStep = 1

		return data.middlewares.every(async middlewareAndMethod => {
			const middlewareArray = middlewareAndMethod.split('.'),
				middleware = middlewareArray[0],
				method = middlewareArray[1],
				reponse = await this.middlewaresList[middleware][method](
					data.request.context
				)
			if (!reponse) {
				return false
			}

			if (middlewareStep >= middlewaresAmount) {
				return await data.next(data.request.context, data.request.value)
			}
			middlewareStep++
		})
	}
}
module.exports = MiddlewareKernel
