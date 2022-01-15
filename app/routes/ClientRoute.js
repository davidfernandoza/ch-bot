'use strict'

const { Router } = require('express')

module.exports = ({
	ClientController,
	AvailableCodeMiddleware,
	TelegramIdMiddleware,
	ClientListMiddleware
}) => {
	const router = Router()
	router.post(
		'/info-active',
		AvailableCodeMiddleware.codeValidate.bind(AvailableCodeMiddleware),
		TelegramIdMiddleware.telegramIdValidate.bind(TelegramIdMiddleware),
		ClientController.activeInfoClientByAPI.bind(ClientController)
	)

	router.post(
		'/change/status',
		AvailableCodeMiddleware.codeValidate.bind(AvailableCodeMiddleware),
		ClientListMiddleware.emptyArrayValidate.bind(ClientListMiddleware),
		ClientController.changeStatusByClientListAPI.bind(ClientController)
	)

	return router
}
