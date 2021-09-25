'use strict'
class MiddlewareKernel {
	constructor({
		ClientMiddleware,
		WalletMiddleware,
		AuthMiddleware,
		InfoMiddleware,
		CountryMiddleware,
		PhoneMiddleware,
		StartMiddleware,
		ErrorHandler
	}) {
		this.errorHandler = ErrorHandler
		this.middlewaresList = {
			ClientMiddleware,
			WalletMiddleware,
			AuthMiddleware,
			InfoMiddleware,
			CountryMiddleware,
			PhoneMiddleware,
			StartMiddleware
		}
	}

	async routerToMiddleware(data) {
		try {
			let middlewaresAmount = data.middlewares.length
			if (middlewaresAmount == 0) {
				data.next()
				return true
			}

			const middlewareArray = data.middlewares[0].split('.'),
				middleware = middlewareArray[0],
				method = middlewareArray[1]

			const response = await this.middlewaresList[middleware][method](
				data.request.context
			)

			if (response) {
				data.middlewares.shift()
				this.routerToMiddleware(data)
			} else {
				return false
			}
		} catch (error) {
			this.errorHandler.sendError(data.request.context, error)
			return false
		}
	}
}
module.exports = MiddlewareKernel
