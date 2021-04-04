'use strict'

/* -----------------------------------------------------*/
/* System Config: 																			*/
/*------------------------------------------------------*/
const StartUp = require('./start-up')
const Config = require('./app')
const Bot = require('./bot')
const Methods = require('./methods')
const BotKernel = require('../app/handlers/bot-kernel')
const { asClass, asFunction, asValue, createContainer } = require('awilix')
const ErrorHandler = require('../helpers/error/error-handler')
const container = createContainer()

/* -----------------------------------------------------*/
/* Validates:					 																	*/
/*------------------------------------------------------*/
const { IsNotBotValidate, WalletValidate } = require('../helpers/validates')

/* -----------------------------------------------------*/
/* Repositories:			 																	*/
/*------------------------------------------------------*/
const {
	WalletRepository,
	ClientRepository,
	PlanRepository,
	TermRepository
} = require('../app/repositories')
/* -----------------------------------------------------*/
/* Presentations:			 																	*/
/*------------------------------------------------------*/
const { StartPresentation } = require('../app/presentations')

/* -----------------------------------------------------*/
/* Domain:						 																	*/
/*------------------------------------------------------*/
const { ClientDomain } = require('../app/domains')

/* -----------------------------------------------------*/
/* Strings:				 																			*/
/*------------------------------------------------------*/
const { MessageString, DefaultString } = require('../helpers/strings')

/* -----------------------------------------------------*/
/* Services:			 																			*/
/*------------------------------------------------------*/
const { UrlBotService, QrCode } = require('../app/services')

/* -----------------------------------------------------*/
/* Events Handler:						 													*/
/*------------------------------------------------------*/
const {
	CallbackQueryHandler,
	TextHandler,
	CommandHandler
} = require('../app/handlers')

/* -----------------------------------------------------*/
/* Controllers:				 																	*/
/*------------------------------------------------------*/
const {
	ClientController,
	StartController,
	MenuController,
	WalletController
} = require('../app/controllers')

/* -----------------------------------------------------*/
/* Traits:						 																	*/
/*------------------------------------------------------*/
const { WalletTrait, TermPlanTrait } = require('../app/traits')

/* -----------------------------------------------------*/
/* Modelos:						 																	*/
/*------------------------------------------------------*/
const { Client } = require('../app/models')

//System Config:
container
	// System:
	.register({
		App: asClass(StartUp).singleton(),
		Config: asValue(Config),
		Bot: asFunction(Bot).singleton(),
		Methods: asValue(Methods),
		BotKernel: asFunction(BotKernel).singleton(),
		ErrorHandler: asClass(ErrorHandler).singleton()
	})

	// Validates:
	.register({
		IsNotBotValidate: asClass(IsNotBotValidate).singleton(),
		WalletValidate: asClass(WalletValidate).singleton()
	})

	// Strings:
	.register({
		MessageString: asValue(MessageString),
		DefaultString: asValue(DefaultString)
	})

	// Controllers:
	.register({
		ClientController: asClass(ClientController).singleton(),
		StartController: asClass(StartController).singleton(),
		MenuController: asClass(MenuController).singleton(),
		WalletController: asClass(WalletController).singleton()
	})

	// Traits:
	.register({
		WalletTrait: asClass(WalletTrait).singleton(),
		TermPlanTrait: asClass(TermPlanTrait).singleton()
	})

	// Models:
	.register({
		Client: asValue(Client)
	})

	// Handlers:
	.register({
		TextHandler: asClass(TextHandler).singleton(),
		CallbackQueryHandler: asClass(CallbackQueryHandler).singleton(),
		CommandHandler: asClass(CommandHandler).singleton()
	})

	// Services:
	.register({
		UrlBotService: asClass(UrlBotService).singleton(),
		QrCode: asClass(QrCode).singleton()
	})

	// Repositories
	.register({
		WalletRepository: asClass(WalletRepository).singleton(),
		ClientRepository: asClass(ClientRepository).singleton(),
		PlanRepository: asClass(PlanRepository).singleton(),
		TermRepository: asClass(TermRepository).singleton()
	})

	// Domain
	.register({
		ClientDomain: asClass(ClientDomain).singleton()
	})

	// Presentations
	.register({
		StartPresentation: asClass(StartPresentation).singleton()
	})

module.exports = container
