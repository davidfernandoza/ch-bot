'use strict'

/* -----------------------------------------------------*/
/* Awilix: 																							*/
/*------------------------------------------------------*/
const { asClass, asFunction, asValue, createContainer } = require('awilix')
const container = createContainer()

/* -----------------------------------------------------*/
/* Controllers:				 																	*/
/*------------------------------------------------------*/
const ClientController = require('../app/controllers/ClientController')
const StartController = require('../app/controllers/StartController')
const MenuController = require('../app/controllers/MenuController')
const WalletController = require('../app/controllers/WalletController')
const TransactionController = require('../app/controllers/TransactionController')
const ReferredLinkController = require('../app/controllers/ReferredLinkController')
const ClientReferralsController = require('../app/controllers/ClientReferralsController')
const CountryController = require('../app/controllers/CountryController')
const DefaultController = require('../app/controllers/DefaultController')

/* -----------------------------------------------------*/
/* Chats:			 																					*/
/*------------------------------------------------------*/
const StartChat = require('../app/Chats/StartChat')
const ClientChat = require('../app/Chats/ClientChat')
const MenuChat = require('../app/Chats/MenuChat')
const ValidateChat = require('../app/Chats/ValidateChat')
const WalletChat = require('../app/Chats/WalletChat')
const TransactionChat = require('../app/Chats/TransactionChat')
const ReferredLinkChat = require('../app/Chats/ReferredLinkChat')
const ClientReferralsChat = require('../app/Chats/ClientReferralsChat')
const CountryChat = require('../app/Chats/CountryChat')

/* -----------------------------------------------------*/
/* Domain:						 																	*/
/*------------------------------------------------------*/
const WalletDomain = require('../app/domains/wallet/WalletDomain')
const ActionWalletDomain = require('../app/domains/wallet/ActionWalletDomain')
const BuildWalletDomain = require('../app/domains/wallet/BuildWalletDomain')

const TransactionValidateDomain = require('../app/domains/transaction/TransactionValidateDomain')
const ClientDomain = require('../app/domains/clients/ClientDomain')
const BuildClientDomain = require('../app/domains/clients/BuildClientDomain')
const ClientReferralsDomain = require('../app/domains/clients/ClientReferralsDomain')
const DefaultActionDomain = require('../app/domains/clients/DefaultActionDomain')

const StartDomain = require('../app/domains/start/StartDomain')

const AuthDomain = require('../app/domains/auth/authDomain')

const CountryDomain = require('../app/domains/country/CountryDomain')

/* -----------------------------------------------------*/
/* Events Handler:						 													*/
/*------------------------------------------------------*/
const CallbackQueryHandler = require('../app/handlers/CallbackQueryHandler')
const TextHandler = require('../app/handlers/TextHandler')
const CommandHandler = require('../app/handlers/CommandHandler')

/* -----------------------------------------------------*/
/* Modelos:						 																	*/
/*------------------------------------------------------*/
const Client = require('../app/models/Client')

/* -----------------------------------------------------*/
/* Middlewares:					 																*/
/*------------------------------------------------------*/
const ClientMiddleware = require('../app/middlewares/ClientMiddleware')
const MiddlewareKernel = require('../app/middlewares/MiddlewareKernel')
const WalletMiddleware = require('../app/middlewares/WalletMiddleware')
const AuthMiddleware = require('../app/middlewares/AuthMiddleware')
const InfoMiddleware = require('../app/middlewares/InfoMiddleware')
const CountryMiddleware = require('../app/middlewares/CountryMiddleware')

/* -----------------------------------------------------*/
/* Repositories:			 																	*/
/*------------------------------------------------------*/
const ClientRepository = require('../app/repositories/ClientRepository')
const PlanRepository = require('../app/repositories/PlanRepository')
const TermRepository = require('../app/repositories/TermRepository')
const TransactionRepository = require('../app/repositories/TransactionRepository')
const AuthRepository = require('../app/repositories/AuthRepository')
const CountryRepository = require('../app/repositories/CountryRepository')
const WalletRepository = require('../app/repositories/WalletRepository')

/* -----------------------------------------------------*/
/* Strings:				 																			*/
/*------------------------------------------------------*/
const MessageString = require('../helpers/strings/MessagesString')
const DefaultString = require('../helpers/strings/DefaultString')

/* -----------------------------------------------------*/
/* Services:			 																			*/
/*------------------------------------------------------*/
const UrlBotService = require('../app/services/UrlBotService')
const QrCodeService = require('../app/services/QrCodeService')

/* -----------------------------------------------------*/
/* System Config: 																			*/
/*------------------------------------------------------*/
const StartUp = require('./StartUp')
const Config = require('./App')
const Bot = require('./Bot')
const BotKernel = require('../app/handlers/BotKernel')
const ErrorHandler = require('../helpers/error/ErrorHandler')

/* -----------------------------------------------------*/
/* Validates:					 																	*/
/*------------------------------------------------------*/
const IsNotBotValidate = require('../app/validates/IsNotBotValidate')
const WalletValidate = require('../app/validates/WalletValidate')
const ClientValidate = require('../app/validates/ClientValidate')
const InfoValidate = require('../app/validates/InfoValidate')

/* -----------------------------------------------------*/
/* Register:					 																	*/
/*------------------------------------------------------*/
container

	// Controllers:
	.register({
		ClientController: asClass(ClientController).singleton(),
		StartController: asClass(StartController).singleton(),
		MenuController: asClass(MenuController).singleton(),
		WalletController: asClass(WalletController).singleton(),
		TransactionController: asClass(TransactionController).singleton(),
		ReferredLinkController: asClass(ReferredLinkController).singleton(),
		ClientReferralsController: asClass(ClientReferralsController).singleton(),
		CountryController: asClass(CountryController).singleton(),
		DefaultController: asClass(DefaultController).singleton()
	})

	// Chats
	.register({
		StartChat: asClass(StartChat).singleton(),
		ClientChat: asClass(ClientChat).singleton(),
		MenuChat: asClass(MenuChat).singleton(),
		ValidateChat: asClass(ValidateChat).singleton(),
		WalletChat: asClass(WalletChat).singleton(),
		TransactionChat: asClass(TransactionChat).singleton(),
		ReferredLinkChat: asClass(ReferredLinkChat).singleton(),
		ClientReferralsChat: asClass(ClientReferralsChat).singleton(),
		CountryChat: asClass(CountryChat).singleton()
	})

	// Domain
	.register({
		ClientDomain: asClass(ClientDomain).singleton(),
		StartDomain: asClass(StartDomain).singleton(),
		ActionWalletDomain: asClass(ActionWalletDomain).singleton(),
		BuildWalletDomain: asClass(BuildWalletDomain).singleton(),
		WalletDomain: asClass(WalletDomain).singleton(),
		BuildClientDomain: asClass(BuildClientDomain).singleton(),
		TransactionValidateDomain: asClass(TransactionValidateDomain).singleton(),
		AuthDomain: asClass(AuthDomain).singleton(),
		ClientReferralsDomain: asClass(ClientReferralsDomain).singleton(),
		CountryDomain: asClass(CountryDomain).singleton(),
		DefaultActionDomain: asClass(DefaultActionDomain).singleton()
	})

	// Events Handler:
	.register({
		TextHandler: asClass(TextHandler).singleton(),
		CallbackQueryHandler: asClass(CallbackQueryHandler).singleton(),
		CommandHandler: asClass(CommandHandler).singleton()
	})

	// Models:
	.register({
		Client: asValue(Client)
	})

	// Middlewares
	.register({
		ClientMiddleware: asClass(ClientMiddleware).singleton(),
		WalletMiddleware: asClass(WalletMiddleware).singleton(),
		AuthMiddleware: asClass(AuthMiddleware).singleton(),
		MiddlewareKernel: asClass(MiddlewareKernel).singleton(),
		InfoMiddleware: asClass(InfoMiddleware).singleton(),
		CountryMiddleware: asClass(CountryMiddleware).singleton()
	})

	// Repositories
	.register({
		WalletRepository: asClass(WalletRepository).singleton(),
		ClientRepository: asClass(ClientRepository).singleton(),
		PlanRepository: asClass(PlanRepository).singleton(),
		TermRepository: asClass(TermRepository).singleton(),
		TransactionRepository: asClass(TransactionRepository).singleton(),
		AuthRepository: asClass(AuthRepository).singleton(),
		CountryRepository: asClass(CountryRepository).singleton()
	})

	// Strings:
	.register({
		MessageString: asValue(MessageString),
		DefaultString: asValue(DefaultString)
	})

	// Services:
	.register({
		UrlBotService: asClass(UrlBotService).singleton(),
		QrCodeService: asClass(QrCodeService).singleton()
	})

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
		ClientValidate: asClass(ClientValidate).singleton(),
		InfoValidate: asClass(InfoValidate).singleton()
	})

module.exports = container
