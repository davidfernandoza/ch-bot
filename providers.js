'use strict'

/* -----------------------------------------------------*/
/* Awilix: 																							*/
/*------------------------------------------------------*/
const { asClass, asFunction, asValue, createContainer } = require('awilix')
const container = createContainer()

/* -----------------------------------------------------*/
/* Controllers:				 																	*/
/*------------------------------------------------------*/
const ClientController = require('./app/controllers/ClientController')
const StartController = require('./app/controllers/StartController')
const MenuController = require('./app/controllers/MenuController')
const WalletController = require('./app/controllers/WalletController')
const TransactionController = require('./app/controllers/TransactionController')
const ReferredLinkController = require('./app/controllers/ReferredLinkController')
const ClientReferralsController = require('./app/controllers/ClientReferralsController')
const CountryController = require('./app/controllers/CountryController')
const DefaultController = require('./app/controllers/DefaultController')
const PhoneController = require('./app/controllers/PhoneController')
const EmailController = require('./app/controllers/EmailController')
const PeriodController = require('./app/controllers/PeriodController')

/* -----------------------------------------------------*/
/* Chats:			 																					*/
/*------------------------------------------------------*/
const StartChat = require('./app/Chats/StartChat')
const ClientChat = require('./app/Chats/ClientChat')
const MenuChat = require('./app/Chats/MenuChat')
const ValidateChat = require('./app/Chats/ValidateChat')
const WalletChat = require('./app/Chats/WalletChat')
const TransactionChat = require('./app/Chats/TransactionChat')
const ReferredLinkChat = require('./app/Chats/ReferredLinkChat')
const ClientReferralsChat = require('./app/Chats/ClientReferralsChat')
const CountryChat = require('./app/Chats/CountryChat')
const PhoneChat = require('./app/Chats/PhoneChat')
const EmailChat = require('./app/Chats/EmailChat')
const PeriodChat = require('./app/Chats/PeriodChat')

/* -----------------------------------------------------*/
/* Domain:						 																	*/
/*------------------------------------------------------*/
const WalletDomain = require('./app/domains/wallet/WalletDomain')
const ActionWalletDomain = require('./app/domains/wallet/ActionWalletDomain')
const BuildWalletDomain = require('./app/domains/wallet/BuildWalletDomain')
const TransactionValidateDomain = require('./app/domains/transaction/TransactionValidateDomain')
const ClientDomain = require('./app/domains/clients/ClientDomain')
const BuildClientDomain = require('./app/domains/clients/BuildClientDomain')
const ClientReferralsDomain = require('./app/domains/clients/ClientReferralsDomain')
const DefaultActionDomain = require('./app/domains/clients/DefaultActionDomain')
const StartDomain = require('./app/domains/start/StartDomain')
const AuthDomain = require('./app/domains/auth/authDomain')
const CountryDomain = require('./app/domains/country/CountryDomain')
const PhoneDomain = require('./app/domains/phone/PhoneDomain')
const EmailDomain = require('./app/domains/email/EmailDomain')
const StatusClientDomain = require('./app/domains/clients/StatusClientDomain')
const PeriodDomain = require('./app/domains/period/PeriodDomain')

/* -----------------------------------------------------*/
/* Events Handler:						 													*/
/*------------------------------------------------------*/
const CallbackQueryHandler = require('./app/handlers/CallbackQueryHandler')
const TextHandler = require('./app/handlers/TextHandler')
const CommandHandler = require('./app/handlers/CommandHandler')

/* -----------------------------------------------------*/
/* Modelos:						 																	*/
/*------------------------------------------------------*/
const Client = require('./app/models/Client')

/* -----------------------------------------------------*/
/* Middlewares:					 																*/
/*------------------------------------------------------*/
const ClientMiddleware = require('./app/middlewares/ClientMiddleware')
const MiddlewareKernel = require('./app/middlewares/MiddlewareKernel')
const WalletMiddleware = require('./app/middlewares/WalletMiddleware')
const AuthMiddleware = require('./app/middlewares/AuthMiddleware')
const InfoMiddleware = require('./app/middlewares/InfoMiddleware')
const CountryMiddleware = require('./app/middlewares/CountryMiddleware')
const PhoneMiddleware = require('./app/middlewares/PhoneMiddleware')
const EmailMiddleware = require('./app/middlewares/EmailMiddleware')
const AvailableCodeMiddleware = require('./app/middlewares/api/AvailableCodeMiddleware')
const TelegramIdMiddleware = require('./app/middlewares/api/TelegramIdMiddleware')

/* -----------------------------------------------------*/
/* Repositories:			 																	*/
/*------------------------------------------------------*/
const ClientRepository = require('./app/repositories/ClientRepository')
const PlanRepository = require('./app/repositories/PlanRepository')
const TermRepository = require('./app/repositories/TermRepository')
const TransactionRepository = require('./app/repositories/TransactionRepository')
const AuthRepository = require('./app/repositories/AuthRepository')
const CountryRepository = require('./app/repositories/CountryRepository')
const WalletRepository = require('./app/repositories/WalletRepository')

/* -----------------------------------------------------*/
/* Routes:				 																			*/
/*------------------------------------------------------*/
const Router = require('./app/routes/index')
const ClientRoute = require('./app/routes/ClientRoute')

/* -----------------------------------------------------*/
/* Strings:				 																			*/
/*------------------------------------------------------*/
const MessageString = require('./helpers/strings/MessagesString')
const DefaultString = require('./helpers/strings/DefaultString')
const ApiErrorString = require('./helpers/strings/ApiErrorString')

/* -----------------------------------------------------*/
/* Services:			 																			*/
/*------------------------------------------------------*/
const UrlBotService = require('./app/services/UrlBotService')
const QrCodeService = require('./app/services/QrCodeService')

/* -----------------------------------------------------*/
/* System Config: 																			*/
/*------------------------------------------------------*/
const StartUp = require('./config/StartUp')
const Config = require('./config/App')
const Bot = require('./config/Bot')
const BotKernel = require('./app/handlers/BotKernel')
const ErrorHandler = require('./helpers/error/ErrorHandler')

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
		DefaultController: asClass(DefaultController).singleton(),
		PhoneController: asClass(PhoneController).singleton(),
		EmailController: asClass(EmailController).singleton(),
		PeriodController: asClass(PeriodController).singleton()
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
		CountryChat: asClass(CountryChat).singleton(),
		PhoneChat: asClass(PhoneChat).singleton(),
		EmailChat: asClass(EmailChat).singleton(),
		PeriodChat: asClass(PeriodChat).singleton()
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
		DefaultActionDomain: asClass(DefaultActionDomain).singleton(),
		PhoneDomain: asClass(PhoneDomain).singleton(),
		EmailDomain: asClass(EmailDomain).singleton(),
		StatusClientDomain: asClass(StatusClientDomain).singleton(),
		PeriodDomain: asClass(PeriodDomain).singleton()
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
		CountryMiddleware: asClass(CountryMiddleware).singleton(),
		PhoneMiddleware: asClass(PhoneMiddleware).singleton(),
		EmailMiddleware: asClass(EmailMiddleware).singleton(),
		AvailableCodeMiddleware: asClass(AvailableCodeMiddleware).singleton(),
		TelegramIdMiddleware: asClass(TelegramIdMiddleware).singleton()
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

	// Router
	.register({
		Router: asFunction(Router).singleton(),
		ClientRoute: asFunction(ClientRoute).singleton()
	})

	// Strings:
	.register({
		MessageString: asValue(MessageString),
		DefaultString: asValue(DefaultString),
		ApiErrorString: asValue(ApiErrorString)
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

module.exports = container
