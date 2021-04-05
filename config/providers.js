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
/* Views:			 																	*/
/*------------------------------------------------------*/
const {
	StartView,
	ClientView,
	MenuView,
	ValidateView,
	WalletView
} = require('../app/views')

/* -----------------------------------------------------*/
/* Domain:						 																	*/
/*------------------------------------------------------*/
const { ClientDomain, StartDomain, WalletDomain } = require('../app/domains')

/* -----------------------------------------------------*/
/* Strings:				 																			*/
/*------------------------------------------------------*/
const { MessageString, DefaultString } = require('../helpers/strings')

/* -----------------------------------------------------*/
/* Services:			 																			*/
/*------------------------------------------------------*/
const { UrlBotService, QrCodeService } = require('../app/services')

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
		QrCodeService: asClass(QrCodeService).singleton()
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
		ClientDomain: asClass(ClientDomain).singleton(),
		StartDomain: asClass(StartDomain).singleton(),
		WalletDomain: asClass(WalletDomain).singleton()
	})

	// Views
	.register({
		StartView: asClass(StartView).singleton(),
		ClientView: asClass(ClientView).singleton(),
		MenuView: asClass(MenuView).singleton(),
		ValidateView: asClass(ValidateView).singleton(),
		WalletView: asClass(WalletView).singleton()
	})

module.exports = container
