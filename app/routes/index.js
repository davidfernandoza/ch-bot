'use strict'
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const express = require('express')
const { Router } = express
require('express-async-errors')

module.exports = ({ ErrorHandler, ClientRoute }) => {
	const router = Router()
	const apiRoute = Router()

	// Parsear la peticion
	apiRoute
		.use(cors())
		.use(helmet())
		.use(express.urlencoded({ extended: true }))
		.use(express.json())
		.use(compression())

	// registrar las rutas
	apiRoute.use('/client', ClientRoute)
	router.use('/api', apiRoute)

	// Not Found 404
	router.use(() => {
		throw new Error('ERR404')
	})

	//  Manejador de errores
	router.use(ErrorHandler.apiErrorHandler.bind(ErrorHandler))

	return router
}
