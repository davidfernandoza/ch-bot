'use strict'

/* -----------------------------------------------------*/
/* System Config: 																			*/
/*------------------------------------------------------*/
const StartUp = require('./start-up')
const Config = require('./app')
const Bot = require('./bot')
const Methods = require('./methods')
const BotRegister = require('../app/bot-register')
const { asClass, asFunction, asValue, createContainer } = require('awilix')
const container = createContainer()

/* -----------------------------------------------------*/
/* Validates:					 																	*/
/*------------------------------------------------------*/
const { IsNotBotValidate, WalletValidate } = require('../helpers/validates')

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
const { CallbackQueryHandler, TextHandler } = require('../app/handlers')

/* -----------------------------------------------------*/
/* Controllers:				 																	*/
/*------------------------------------------------------*/
const {
	ClientController,
	TermPlanController,
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
		BotRegister: asFunction(BotRegister).singleton()
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
		TermPlanController: asClass(TermPlanController).singleton(),
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

	// Event Handlers:
	.register({
		TextHandler: asClass(TextHandler).singleton(),
		CallbackQueryHandler: asClass(CallbackQueryHandler).singleton()
	})

	// Services:
	.register({
		UrlBotService: asClass(UrlBotService).singleton(),
		QrCode: asClass(QrCode).singleton()
	})

module.exports = container
