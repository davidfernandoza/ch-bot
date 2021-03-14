'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClientSchema = new Schema({
	client_id: { type: Number, unique: true },
	action_bot: {
		type: String,
		enum: ['NONE', 'GET_WALLET', 'GET_COUNTRY'],
		default: 'NONE'
	},
	sponsor_id: { type: String, default: 1 },
	sponsor_telegram_id: { type: String, default: '1ROOT' },
	full_name: String,
	country_id: String,
	birthday: Date,
	username: { type: String, unique: true },
	phone: String,
	telegram_id: { type: String, unique: true },
	email: { type: String, unique: true },
	status: {
		type: String,
		enum: ['ACTIVE', 'COMPANY', 'INACTIVE', 'DEBT'],
		default: 'INACTIVE'
	},
	tree_id: { type: Number, unique: true }
})

module.exports = mongoose.model('Client', ClientSchema)
