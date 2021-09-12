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
		EmailController,
		PeriodController
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
		this.emailController = EmailController
		this.periodController = PeriodController
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
				middlewares: ['ClientMiddleware.clientExistValidate'],
				request: { context: CTX },
				next: () => {
					return
				}
			})
		}
	}

	selectAction(CTX, actionBot) {
		switch (actionBot) {
			case 'GET_WALLET':
				this.middlewareKernel.routerToMiddleware({
					middlewares: ['WalletMiddleware.correctWallet'],
					request: { context: CTX },
					next: () => this.walletController.storeWallet(CTX)
				})
				break
			case 'GET_PHONE':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'WalletMiddleware.clientWithWallet',
						'AuthMiddleware.isActive',
						'PhoneMiddleware.phoneValidate'
					],
					request: { context: CTX },
					next: () => this.phoneController.setPhoneToClient(CTX)
				})
				break
			case 'GET_EMAIL':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'WalletMiddleware.clientWithWallet',
						'AuthMiddleware.isActive',
						'EmailMiddleware.emailValidate'
					],
					request: { context: CTX },
					next: () => this.emailController.setEmailToClient(CTX)
				})
				break
			case '🤝 Codigo de referido':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'WalletMiddleware.clientWithWallet',
						'AuthMiddleware.isActive',
						'InfoMiddleware.infoExistValidate',
						'InfoMiddleware.clientIsInfo'
					],
					request: { context: CTX },
					next: () => this.referredLinkController.senReferradLink(CTX)
				})
				break
			case '👨‍👧‍👦 Referidos':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'WalletMiddleware.clientWithWallet',
						'AuthMiddleware.isActive',
						'InfoMiddleware.infoExistValidate',
						'InfoMiddleware.clientIsInfo'
					],
					request: { context: CTX },
					next: () => this.menuController.openReferralsMenu(CTX)
				})
				break
			case '💵 Cobrar':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'WalletMiddleware.clientWithWallet',
						'AuthMiddleware.isActive',
						'InfoMiddleware.infoExistValidate',
						'InfoMiddleware.clientIsInfo'
					],
					request: { context: CTX },
					next: () => this.menuController.openChargeMenu(CTX)
				})
				break
			case '📆 Ciclo':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'WalletMiddleware.clientWithWallet'
					],
					request: { context: CTX },
					next: () => this.menuController.openCycleMenu(CTX)
				})
				break
			case '🔄 Estado':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'WalletMiddleware.clientWithWallet'
					],
					request: { context: CTX },
					next: () => this.periodController.getStatusToPeriod(CTX)
				})
				break
			case '⚖️ Reglas':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'WalletMiddleware.clientWithWallet',
						'AuthMiddleware.isActive',
						'InfoMiddleware.infoExistValidate'
					],
					request: { context: CTX },
					next: () => this.menuController.openRulesMenu(CTX)
				})
				break
			case '👤 Mi informacion':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'WalletMiddleware.clientWithWallet',
						'AuthMiddleware.isActive',
						'InfoMiddleware.clientIsActive'
					],
					request: { context: CTX },
					next: () => this.menuController.openMyInfoMenu(CTX)
				})
				break
			case '🇪🇨 Agregar pais':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'WalletMiddleware.clientWithWallet',
						'AuthMiddleware.isActive'
					],
					request: { context: CTX },
					next: () => this.countryController.getAllCountries(CTX)
				})
				break
			case '📞 Agregar telefono':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'WalletMiddleware.clientWithWallet',
						'AuthMiddleware.isActive',
						'CountryMiddleware.countryExist'
					],
					request: { context: CTX },
					next: () => this.phoneController.setActionForGetPhone(CTX)
				})
				break
			case '🌐 Agregar email':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'WalletMiddleware.clientWithWallet',
						'AuthMiddleware.isActive'
					],
					request: { context: CTX },
					next: () => this.emailController.setActionForGetEmail(CTX)
				})
				break
			case '⬅️ Menu principal':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'WalletMiddleware.clientWithWallet',
						'AuthMiddleware.isActive'
					],
					request: { context: CTX },
					next: () => this.menuController.openMenu(CTX)
				})
				break
			case '👤 Ver mi informacion':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'WalletMiddleware.clientWithWallet',
						'AuthMiddleware.isActive'
					],
					request: { context: CTX },
					next: () => this.clientController.showClientInfo(CTX)
				})
				break
			case '🧍🏽‍♂️ Ref. Izquierdo':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'WalletMiddleware.clientWithWallet',
						'AuthMiddleware.isActive',
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
						'WalletMiddleware.clientWithWallet',
						'AuthMiddleware.isActive',
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
						'WalletMiddleware.clientWithWallet',
						'AuthMiddleware.isActive',
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
						'WalletMiddleware.clientWithWallet',
						'AuthMiddleware.isActive',
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
