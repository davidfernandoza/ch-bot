'use strict'

/* -----------------------------------------------------*/
/* System Config: 																			*/
/*------------------------------------------------------*/
const StartUp = require('./app/start-up')
const Config = require('./config/env')
const Bot = require('./config/bot')
const Methods = require('./config/methods')
const { asClass, asFunction, asValue, createContainer } = require('awilix')
const container = createContainer()

/* -----------------------------------------------------*/
/* Validates:					 																	*/
/*------------------------------------------------------*/
const { IsNotBotValidate } = require('./helpers/validates')

/* -----------------------------------------------------*/
/* Strings:				 																			*/
/*------------------------------------------------------*/
const { MessageString, TermsString } = require('./helpers/strings')

/* -----------------------------------------------------*/
/* Services:			 																			*/
/*------------------------------------------------------*/
const { UrlBotService } = require('./app/services')

/* -----------------------------------------------------*/
/* Registers:			 																			*/
/*------------------------------------------------------*/
const { ComandsRegister, EventsRegister } = require('./app/registers')

/* -----------------------------------------------------*/
/* Events Handler:						 													*/
/*------------------------------------------------------*/
const { HandlerCallbackQuery, HandlerText } = require('./app/handler')

/* -----------------------------------------------------*/
/* Controllers:				 																	*/
/*------------------------------------------------------*/
const {
	RegisterController,
	StartController,
	MenuController
} = require('./app/controllers')

//System Config:
container
	// System:
	.register({
		App: asClass(StartUp).singleton(),
		Config: asValue(Config),
		Bot: asFunction(Bot).singleton(),
		Methods: asValue(Methods)
	})

	// Validates:
	.register({
		IsNotBotValidate: asClass(IsNotBotValidate).singleton()
	})

	// Strings:
	.register({
		MessageString: asValue(MessageString),
		TermsString: asValue(TermsString)
	})

	// Controllers:
	.register({
		RegisterController: asClass(RegisterController).singleton(),
		StartController: asClass(StartController).singleton(),
		MenuController: asClass(MenuController).singleton()
	})

	// Event Handlers:
	.register({
		HandlerText: asClass(HandlerText).singleton(),
		HandlerCallbackQuery: asClass(HandlerCallbackQuery).singleton()
	})

	// Services:
	.register({
		UrlBotService: asClass(UrlBotService).singleton()
	})

	// Register:
	.register({
		ComandsRegister: asFunction(ComandsRegister).singleton(),
		EventsRegister: asFunction(EventsRegister).singleton()
	})

module.exports = container
