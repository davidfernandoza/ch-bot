'use strict'

/* -----------------------------------------------------*/
/* System Config: 																			*/
/*------------------------------------------------------*/
const StartUp = require('./start-up')
const Config = require('../config/env')
const Bot = require('../config/bot')
const Methods = require('../config/methods')
const { asClass, asFunction, asValue, createContainer } = require('awilix')
const container = createContainer()

/* -----------------------------------------------------*/
/* Validates:					 																	*/
/*------------------------------------------------------*/
const { IsNotBotValidate } = require('./helpers/validates')

/* -----------------------------------------------------*/
/* Strings:				 																			*/
/*------------------------------------------------------*/
const { MessageString } = require('./helpers/strings')

/* -----------------------------------------------------*/
/* Services:			 																			*/
/*------------------------------------------------------*/
const { UrlBotService } = require('./helpers/services')

/* -----------------------------------------------------*/
/* Registers:			 																			*/
/*------------------------------------------------------*/
const { ComandsRegister, EventsRegister } = require('./register')

/* -----------------------------------------------------*/
/* Events:						 																	*/
/*------------------------------------------------------*/
const { EventCallbackQuery } = require('./events')

/* -----------------------------------------------------*/
/* Controllers:				 																	*/
/*------------------------------------------------------*/
const { RegisterController, StartController } = require('./controllers')

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

	// Messages:
	.register({
		MessageString: asValue(MessageString)
	})

	// Controllers:
	.register({
		RegisterController: asClass(RegisterController).singleton(),
		StartController: asClass(StartController).singleton()
	})

	// Event:
	.register({
		EventCallbackQuery: asClass(EventCallbackQuery).singleton()
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
