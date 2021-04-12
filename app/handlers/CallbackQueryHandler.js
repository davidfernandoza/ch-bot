'use strict'
class CallbackQueryHandler {
	constructor({ ClientController, WalletController, MiddlewareKernel }) {
		this.middlewareKernel = MiddlewareKernel
		this.controllers = {
			ClientController,
			WalletController
		}
	}
	/*
	 * Captura el evento del boton en linea presionado
	 */
	getButtonAction(CTX) {
		const buttonValueArray = CTX.update.callback_query.data.split(':'),
			buttonAction = buttonValueArray[0],
			buttonValue = buttonValueArray[1]
		this.selectAction(CTX, buttonAction, buttonValue)
	}

	selectAction(CTX, buttonAction, buttonValue) {
		switch (buttonAction) {
			case 'acceptTerms':
				this.middlewareKernel.routerToMiddleware({
					middlewares: ['ClientMiddleware.clientExistValidate'],
					request: { context: CTX, value: buttonValue },
					next: () =>
						this.controllers.ClientController.storeClient(CTX, buttonValue)
				})
				break
			case 'changeWallet':
				this.controllers.WalletController.updateWalletAction(CTX)
				break
		}
	}
}
module.exports = CallbackQueryHandler
