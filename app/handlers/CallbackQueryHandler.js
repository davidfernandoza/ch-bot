'use strict'
class CallbackQueryHandler {
	constructor({
		ClientController,
		TransactionController,
		WalletController,
		MenuController,
		MiddlewareKernel,
		StartController
	}) {
		this.middlewareKernel = MiddlewareKernel
		this.controllers = {
			ClientController,
			WalletController,
			TransactionController,
			MenuController,
			StartController
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
			case 'newClient':
				this.middlewareKernel.routerToMiddleware({
					middlewares: ['ClientMiddleware.clientNotExistValidate'],
					request: { context: CTX, value: buttonValue },
					next: () => this.controllers.StartController.sendTermsAndPlans(CTX)
				})
				break
			case 'acceptTerms':
				this.middlewareKernel.routerToMiddleware({
					middlewares: ['ClientMiddleware.clientNotExistValidate'],
					request: { context: CTX, value: buttonValue },
					next: () =>
						this.controllers.ClientController.storeClient(CTX, buttonValue)
				})
				break
			case 'changeWallet':
				this.middlewareKernel.routerToMiddleware({
					middlewares: ['ClientMiddleware.clientExistValidate'],
					request: { context: CTX, value: buttonValue },
					next: () =>
						this.controllers.WalletController.assingWalletAction(
							CTX,
							buttonValue
						)
				})
				break
			case 'transactionValidate':
				this.middlewareKernel.routerToMiddleware({
					middlewares: ['ClientMiddleware.clientExistValidate'],
					request: { context: CTX, value: buttonValue },
					next: () =>
						this.controllers.TransactionController.getValidationInBack(CTX)
				})
				break
			case 'openMenu':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'AuthMiddleware.isActive'
					],
					request: { context: CTX, value: buttonValue },
					next: () => this.controllers.MenuController.openMenu(CTX)
				})
				break
			case 'openWebK':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'AuthMiddleware.isActive'
					],
					request: { context: CTX, value: buttonValue },
					next: () => this.controllers.MenuController.openWebKValidate(CTX)
				})
				break
		}
	}
}
module.exports = CallbackQueryHandler
