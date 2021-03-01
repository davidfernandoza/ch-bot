'use strict'
require('dotenv').config()

const { NODE_ENV } = process.env
const PRODUCTION = require('./production')
const DEVELOPMENT = require('./development')
const TEST = require('./test')

let currentEnv = DEVELOPMENT

if (NODE_ENV === 'production') {
	currentEnv = PRODUCTION
} else if (NODE_ENV === 'test') {
	currentEnv = TEST
}

module.exports = currentEnv
