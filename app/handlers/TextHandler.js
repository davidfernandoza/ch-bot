'use strict'

class TextHandler {
	constructor({
		ClientRepository,
		MiddlewareKernel,
		WalletController,
		ReferredLinkController,
		MenuController,
		ClientReferralsController,
		ClientController,
		CountryController,
		DefaultController,
		PhoneController,
		PeriodController,
		StartController,
		TransactionController,
		TermController,
		PaymentController
	}) {
		this.clientRepository = ClientRepository
		this.middlewareKernel = MiddlewareKernel
		this.walletController = WalletController
		this.referredLinkController = ReferredLinkController
		this.menuController = MenuController
		this.clientReferralsController = ClientReferralsController
		this.clientController = ClientController
		this.countryController = CountryController
		this.defaultController = DefaultController
		this.phoneController = PhoneController
		this.periodController = PeriodController
		this.startController = StartController
		this.termController = TermController
		this.transactionController = TransactionController
		this.paymentController = PaymentController
	}
	/*
	 * Maneja el evento de texto enviado
	 */
	async getClientAction(CTX) {
		CTX.client = await this.clientRepository.getClientByTelegramIdInMongo(
			CTX.from.id
		)

		if (CTX.client) {
			const action =
				CTX.client.action_bot.action != 'NONE'
					? CTX.client.action_bot.action
					: CTX.update.message.text
			this.selectAction(CTX, action)
		} else {
			this.middlewareKernel.routerToMiddleware({
				middlewares: [
					'ClientMiddleware.clientNotExistValidate',
					'StartMiddleware.sponsorIdValidate'
				],
				request: { context: CTX },
				next: () => this.startController.setSponsorId(CTX)
			})
		}
	}

	selectAction(CTX, actionBot) {
		switch (actionBot) {
			case 'GET_WALLET':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'WalletMiddleware.correctWallet',
						'ClientMiddleware.clientIsCompany'
					],
					request: { context: CTX },
					next: () => this.walletController.storeWallet(CTX)
				})
				break
			case 'GET_SPONSOR_ID':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'WalletMiddleware.correctWallet',
						'ClientMiddleware.clientIsCompany'
					],
					request: { context: CTX },
					next: () => this.startController.getSponsorId(CTX)
				})
				break
			case 'GET_PHONE':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet',
						'PhoneMiddleware.phoneValidate'
					],
					request: { context: CTX },
					next: () => this.phoneController.setPhoneToClient(CTX)
				})
				break
			case '🔖 Importante':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet',
						'InfoMiddleware.infoExistValidate',
						'ClientMiddleware.inactiveClient'
					],
					request: { context: CTX },
					next: () => this.termController.sendPlanText(CTX)
				})
				break
			case '🤝 Codigo de referido':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet',
						'InfoMiddleware.infoExistValidate',
						'InfoMiddleware.clientIsInfo',
						'ClientMiddleware.inactiveClient'
					],
					request: { context: CTX },
					next: () => this.referredLinkController.sendReferradLink(CTX)
				})
				break
			case '👨‍👧‍👦 Referidos':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet',
						'InfoMiddleware.infoExistValidate',
						'InfoMiddleware.clientIsInfo',
						'ClientMiddleware.inactiveClient'
					],
					request: { context: CTX },
					next: () => this.menuController.openReferralsMenu(CTX)
				})
				break
			case '🏦 Cobrar':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet',
						'InfoMiddleware.infoExistValidate',
						'InfoMiddleware.clientIsInfo',
						'ClientMiddleware.inactiveClient'
					],
					request: { context: CTX },
					next: () => this.menuController.openChargeMenu(CTX)
				})
				break
			case '📊 Consultar saldo':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet',
						'InfoMiddleware.infoExistValidate',
						'InfoMiddleware.clientIsInfo'
					],
					request: { context: CTX },
					next: () => this.paymentController.getBalance(CTX)
				})
				break
			case '💵 Cobrar saldo':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet',
						'ClientMiddleware.inactiveClient',
						'AuthMiddleware.isActive',
						'InfoMiddleware.infoExistValidate',
						'InfoMiddleware.clientIsInfo',
						'PendingPaymentMiddleware.countCharges',
						'ClientMiddleware.validateAmountOfActiveReferrals'
					],
					request: { context: CTX },
					next: () => this.paymentController.validateCollectBalance(CTX)
				})
				break
			case '🗂 Historial':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet',
						'InfoMiddleware.infoExistValidate',
						'InfoMiddleware.clientIsInfo'
					],
					request: { context: CTX },
					next: () => this.paymentController.getPaymentHistory(CTX)
				})
				break
			case '📆 Ciclo':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet',
						'ClientMiddleware.inactiveClient'
					],
					request: { context: CTX },
					next: () => this.menuController.openCycleMenu(CTX)
				})
				break
			case '⚖️ Terminos y condiciones':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet',
						'InfoMiddleware.infoExistValidate',
						'ClientMiddleware.inactiveClient'
					],
					request: { context: CTX },
					next: () => this.termController.sendTermText(CTX)
				})
				break
			case '🔄 Estado':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet'
					],
					request: { context: CTX },
					next: () => this.periodController.getStatusToPeriod(CTX)
				})
				break
			case '💵 Pagar ciclo':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet'
					],
					request: { context: CTX },
					next: () => this.transactionController.sendTransaction(CTX)
				})
				break
			case '💳 Cambiar direccion tron':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet'
					],
					request: { context: CTX },
					next: () => this.walletController.changeWallet(CTX)
				})
				break
			case '👤 Mi informacion':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet',
						'InfoMiddleware.clientIsActive',
						'ClientMiddleware.inactiveClient'
					],
					request: { context: CTX },
					next: () => this.menuController.openMyInfoMenu(CTX)
				})
				break
			case '🇪🇨 Agregar pais':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet'
					],
					request: { context: CTX },
					next: () => this.countryController.getAllCountries(CTX)
				})
				break
			case '📞 Agregar telefono':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet',
						'CountryMiddleware.countryExist'
					],
					request: { context: CTX },
					next: () => this.phoneController.setActionForGetPhone(CTX)
				})
				break
			case '⬅️ Menu principal':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet',
						'ClientMiddleware.inactiveClient'
					],
					request: { context: CTX },
					next: () => this.menuController.openMenu(CTX)
				})
				break
			case '👤 Ver mi informacion':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet'
					],
					request: { context: CTX },
					next: () => this.clientController.showClientInfo(CTX)
				})
				break
			case '🧍🏽‍♂️ Ref. Izquierdo':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet',
						'InfoMiddleware.infoExistValidate'
					],
					request: { context: CTX },
					next: () =>
						this.clientReferralsController.getClientReferrals(
							CTX,
							'REFERAL_LEFT'
						)
				})
				break
			case '🧍🏽 Ref. Central':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet',
						'InfoMiddleware.infoExistValidate'
					],
					request: { context: CTX },
					next: () =>
						this.clientReferralsController.getClientReferrals(
							CTX,
							'REFERAL_CENTER'
						)
				})
				break
			case '🧍🏽‍♀️ Ref. Derecho':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet',
						'InfoMiddleware.infoExistValidate'
					],
					request: { context: CTX },
					next: () =>
						this.clientReferralsController.getClientReferrals(
							CTX,
							'REFERAL_RIGTH'
						)
				})
				break
			case '👨🏽‍💼 Patrocinador':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'ClientMiddleware.clientIsCompany',
						'WalletMiddleware.clientWithWallet',
						'InfoMiddleware.infoExistValidate'
					],
					request: { context: CTX },
					next: () =>
						this.clientReferralsController.getClientReferrals(CTX, 'SPONSOR')
				})
				break
			default:
				if (CTX.client.action_bot.action != 'NONE') {
					this.middlewareKernel.routerToMiddleware({
						middlewares: [
							'ClientMiddleware.clientExistValidate',
							'ClientMiddleware.clientIsCompany',
							'WalletMiddleware.clientWithWallet'
						],
						request: { context: CTX },
						next: () => this.defaultController.defaultHandler(CTX)
					})
				} else {
					this.defaultController.otherTextSended(CTX)
				}
				break
		}
	}
}
module.exports = TextHandler
