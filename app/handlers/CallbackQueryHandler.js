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
			case 'acceptTerms':
				this.middlewareKernel.routerToMiddleware({
					middlewares: ['ClientMiddleware.clientNotExistValidate'],
					request: { context: CTX },
					next: () => this.clientController.storeClient(CTX, buttonValue)
				})
				break
			case 'changeWallet':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany'
					],
					request: { context: CTX },
					next: () => this.walletController.assingWalletAction(CTX, buttonValue)
				})
				break
			case 'transactionValidate':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany'
					],
					request: { context: CTX },
					next: () => this.transactionController.getValidationInBack(CTX)
				})
				break
			case 'openMenu':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet',
						'AuthMiddleware.isActive',
						'InfoMiddleware.infoExistValidate'
					],
					request: { context: CTX },
					next: () => this.menuController.openMenu(CTX)
				})
				break
			case 'openWebK':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet',
						'AuthMiddleware.isActive'
					],
					request: { context: CTX },
					next: () => this.menuController.openWebKValidate(CTX)
				})
				break
			case 'setCountry':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet',
						'AuthMiddleware.isActive',
						'CountryMiddleware.getCountryValidate'
					],
					request: { context: CTX },
					next: () =>
						this.countryController.setCountryForClient(CTX, buttonValue)
				})
				break
			case 'payAPlanWithBalance':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet',
						'AuthMiddleware.isActive',
						'InfoMiddleware.infoExistValidate',
						'PaymentMiddleware.valueBalanceCompleteForPayAPlan'
					],
					request: { context: CTX },
					next: () => this.transactionController.openTransactionWithBalance(CTX)
				})
				break
			case 'actionCancel':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany'
					],
					request: { context: CTX },
					next: () => this.defaultController.cancelHandler(CTX)
				})
				break
		}
	}
}
module.exports = CallbackQueryHandler
