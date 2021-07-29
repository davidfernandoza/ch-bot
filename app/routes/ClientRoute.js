'use strict'

const { Router } = require('express')

module.exports = ({
	ClientController,
	AvailableCodeMiddleware,
	TelegramIdMiddleware
}) => {
	const router = Router()
	router.post(
		'/info-active',
		AvailableCodeMiddleware.codeValidate.bind(AvailableCodeMiddleware),
		TelegramIdMiddleware.telegramIdValidate.bind(TelegramIdMiddleware),
		ClientController.activeInfoClientByAPI.bind(ClientController)
	)

	return router
}
