'use strict'
class CallbackQueryHandler {
	constructor({
		ClientController,
		TransactionController,
		WalletController,
		MiddlewareKernel,
		StartController,
		CountryController,
		MenuController,
		DefaultController
	}) {
		this.middlewareKernel = MiddlewareKernel
		this.clientController = ClientController
		this.walletController = WalletController
		this.transactionController = TransactionController
		this.menuController = MenuController
		this.startController = StartController
		this.countryController = CountryController
		this.defaultController = DefaultController
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
					next: () => this.startController.sendTermsAndPlans(CTX)
				})
				break
			case 'acceptTerms':
				this.middlewareKernel.routerToMiddleware({
					middlewares: ['ClientMiddleware.clientNotExistValidate'],
					request: { context: CTX, value: buttonValue },
					next: () => this.clientController.storeClient(CTX, buttonValue)
				})
				break
			case 'changeWallet':
				this.middlewareKernel.routerToMiddleware({
					middlewares: ['ClientMiddleware.clientExistValidate'],
					request: { context: CTX, value: buttonValue },
					next: () => this.walletController.assingWalletAction(CTX, buttonValue)
				})
				break
			case 'transactionValidate':
				this.middlewareKernel.routerToMiddleware({
					middlewares: ['ClientMiddleware.clientExistValidate'],
					request: { context: CTX, value: buttonValue },
					next: () => this.transactionController.getValidationInBack(CTX)
				})
				break
			case 'openMenu':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'AuthMiddleware.isActive'
					],
					request: { context: CTX, value: buttonValue },
					next: () => this.menuController.openMenu(CTX)
				})
				break
			case 'openWebK':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'AuthMiddleware.isActive'
					],
					request: { context: CTX, value: buttonValue },
					next: () => this.menuController.openWebKValidate(CTX)
				})
				break
			case 'setCountry':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'AuthMiddleware.isActive',
						'CountryMiddleware.getCountryValidate'
					],
					request: { context: CTX, value: buttonValue },
					next: () =>
						this.countryController.setCountryForClient(CTX, buttonValue)
				})
				break
			case 'actionCancel':
				this.middlewareKernel.routerToMiddleware({
					middlewares: ['ClientMiddleware.clientExistValidate'],
					request: { context: CTX, value: buttonValue },
					next: () => this.defaultController.cancelHandler(CTX)
				})
				break
		}
	}
}
module.exports = CallbackQueryHandler
