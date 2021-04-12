'use strict'

/* -----------------------------------------------------*/
/* System Config: 																			*/
/*------------------------------------------------------*/
const StartUp = require('./StartUp')
const Config = require('./App')
const Bot = require('./Bot')
const BotKernel = require('../app/handlers/BotKernel')
const { asClass, asFunction, asValue, createContainer } = require('awilix')
const ErrorHandler = require('../helpers/error/ErrorHandler')
const container = createContainer()

/* -----------------------------------------------------*/
/* Validates:					 																	*/
/*------------------------------------------------------*/
const {
	IsNotBotValidate,
	WalletValidate,
	ClientValidate
} = require('../app/validates')

/* -----------------------------------------------------*/
/* Middlewares:					 																	*/
/*------------------------------------------------------*/
const {
	ClientMiddleware,
	MiddlewareKernel,
	WalletMiddleware
} = require('../app/middlewares')

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
/* Chats:			 																	*/
/*------------------------------------------------------*/
const {
	StartChat,
	ClientChat,
	MenuChat,
	ValidateChat,
	WalletChat
} = require('../app/Chats')

/* -----------------------------------------------------*/
/* Domain:						 																	*/
/*------------------------------------------------------*/
const {
	WalletDomain,
	ActionWalletDomain,
	BuildWalletDomain
} = require('../app/domains/wallet')
const { ClientDomain, BuildClientDomain } = require('../app/domains/clients')
const { StartDomain } = require('../app/domains/start')

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
		BotKernel: asFunction(BotKernel).singleton(),
		ErrorHandler: asClass(ErrorHandler).singleton()
	})

	// Validates:
	.register({
		IsNotBotValidate: asClass(IsNotBotValidate).singleton(),
		WalletValidate: asClass(WalletValidate).singleton(),
		ClientValidate: asClass(ClientValidate).singleton()
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
		ActionWalletDomain: asClass(ActionWalletDomain).singleton(),
		BuildWalletDomain: asClass(BuildWalletDomain).singleton(),
		WalletDomain: asClass(WalletDomain).singleton(),
		BuildClientDomain: asClass(BuildClientDomain).singleton()
	})

	// Chats
	.register({
		StartChat: asClass(StartChat).singleton(),
		ClientChat: asClass(ClientChat).singleton(),
		MenuChat: asClass(MenuChat).singleton(),
		ValidateChat: asClass(ValidateChat).singleton(),
		WalletChat: asClass(WalletChat).singleton()
	})

	// Middlewares
	.register({
		ClientMiddleware: asClass(ClientMiddleware).singleton(),
		WalletMiddleware: asClass(WalletMiddleware).singleton(),
		MiddlewareKernel: asClass(MiddlewareKernel).singleton()
	})

module.exports = container
