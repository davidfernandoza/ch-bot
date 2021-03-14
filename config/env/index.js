'use strict'
require('dotenv').config()

const { NODE_ENV } = process.env
const PRODUCTION = require('./production')
const DEVELOPMENT = require('./development')

let currentEnv = DEVELOPMENT

if (NODE_ENV === 'production') {
	currentEnv = PRODUCTION
}

module.exports = currentEnv
