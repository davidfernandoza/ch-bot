'use strict'

class TextHandler {
	constructor({
		ClientRepository,
		WalletController,
		MiddlewareKernel,
		ReferredLinkController,
		MenuController,
		ClientReferralsController,
		ClientController
	}) {
		this.clientRepository = ClientRepository
		this.middlewareKernel = MiddlewareKernel
		this.controllers = {
			WalletController,
			ReferredLinkController,
			MenuController,
			ClientReferralsController,
			ClientController
		}
	}
	/*
	 * Maneja el evento de texto enviado
	 */
	async getClientAction(CTX) {
		CTX.client = await this.clientRepository.getClientByTelegramIdInMongo(
			CTX.from.id
		)
		const action =
			CTX.client.action_bot.action != 'NONE'
				? CTX.client.action_bot.action
				: CTX.update.message.text

		if (CTX.client) {
			this.selectAction(CTX, action)
		}
	}

	selectAction(CTX, actionBot) {
		switch (actionBot) {
			case 'GET_WALLET':
				this.middlewareKernel.routerToMiddleware({
					middlewares: ['WalletMiddleware.correctWallet'],
					request: { context: CTX, value: null },
					next: () => this.controllers.WalletController.storeWallet(CTX)
				})
				break
			case '🤝 Link Referido':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'AuthMiddleware.isActive',
						'InfoMiddleware.infoExistValidate'
					],
					request: { context: CTX, value: null },
					next: () =>
						this.controllers.ReferredLinkController.senReferradLink(CTX)
				})
				break
			case '👨‍👧‍👦 Referidos':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'AuthMiddleware.isActive',
						'InfoMiddleware.infoExistValidate'
					],
					request: { context: CTX, value: null },
					next: () => this.controllers.MenuController.openReferralsMenu(CTX)
				})
				break
			case '💵 Cobrar':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'AuthMiddleware.isActive',
						'InfoMiddleware.infoExistValidate'
					],
					request: { context: CTX, value: null },
					next: () => this.controllers.MenuController.openChargeMenu(CTX)
				})
				break
			case '📆 Ciclo':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'AuthMiddleware.isActive',
						'InfoMiddleware.infoExistValidate'
					],
					request: { context: CTX, value: null },
					next: () => this.controllers.MenuController.openCycleMenu(CTX)
				})
				break
			case '⚖️ Reglas':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'AuthMiddleware.isActive',
						'InfoMiddleware.infoExistValidate'
					],
					request: { context: CTX, value: null },
					next: () => this.controllers.MenuController.openRulesMenu(CTX)
				})
				break
			case '👤 Mi Informacion':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'AuthMiddleware.isActive'
					],
					request: { context: CTX, value: null },
					next: () => this.controllers.MenuController.openMyInfoMenu(CTX)
				})
				break
			case '⬅️ Menu Principal':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'AuthMiddleware.isActive'
					],
					request: { context: CTX, value: null },
					next: () => this.controllers.MenuController.openMenu(CTX)
				})
				break
			case '👤 Ver mi Informacion':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'AuthMiddleware.isActive'
					],
					request: { context: CTX, value: null },
					next: () => this.controllers.ClientController.showClientInfo(CTX)
				})
				break
			case '🧍🏽‍♂️ Ref. Izquierdo':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'AuthMiddleware.isActive',
						'InfoMiddleware.infoExistValidate'
					],
					request: { context: CTX, value: null },
					next: () =>
						this.controllers.ClientReferralsController.getClientReferrals(
							CTX,
							'REFERAL_LEFT'
						)
				})
				break
			case '🧍🏽 Ref. Central':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'AuthMiddleware.isActive',
						'InfoMiddleware.infoExistValidate'
					],
					request: { context: CTX, value: null },
					next: () =>
						this.controllers.ClientReferralsController.getClientReferrals(
							CTX,
							'REFERAL_CENTER'
						)
				})
				break
			case '🧍🏽‍♀️ Ref. Derecho':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'AuthMiddleware.isActive',
						'InfoMiddleware.infoExistValidate'
					],
					request: { context: CTX, value: null },
					next: () =>
						this.controllers.ClientReferralsController.getClientReferrals(
							CTX,
							'REFERAL_RIGTH'
						)
				})
				break
			case '🧑🏽‍🦱 Generacion 1':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'AuthMiddleware.isActive',
						'InfoMiddleware.infoExistValidate'
					],
					request: { context: CTX, value: null },
					next: () =>
						this.controllers.ClientReferralsController.getClientReferrals(
							CTX,
							'GENERATION_1'
						)
				})
				break
			case '👨🏼‍🦰 Generacion 2':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'AuthMiddleware.isActive',
						'InfoMiddleware.infoExistValidate'
					],
					request: { context: CTX, value: null },
					next: () =>
						this.controllers.ClientReferralsController.getClientReferrals(
							CTX,
							'GENERATION_2'
						)
				})
				break
			case '👨🏼‍🦳 Generacion 3':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'AuthMiddleware.isActive',
						'InfoMiddleware.infoExistValidate'
					],
					request: { context: CTX, value: null },
					next: () =>
						this.controllers.ClientReferralsController.getClientReferrals(
							CTX,
							'GENERATION_3'
						)
				})
				break
			case '👨🏽‍💼 Patrocinador':
				this.middlewareKernel.routerToMiddleware({
					middlewares: [
						'ClientMiddleware.clientExistValidate',
						'AuthMiddleware.isActive',
						'InfoMiddleware.infoExistValidate'
					],
					request: { context: CTX, value: null },
					next: () =>
						this.controllers.ClientReferralsController.getClientReferrals(
							CTX,
							'SPONSOR'
						)
				})
				break
		}
	}
}
module.exports = TextHandler
