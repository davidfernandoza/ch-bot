'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ClientSchema = new Schema({
	client_id: { type: Number, unique: true },
	sponsor_id: { type: Number, default: 1 },
	plan_id: String,
	sponsor_telegram_id: { type: String, default: '1ROOT' },
	full_name: String,
	country_id: String,
	birthday: Date,
	username: { type: String, unique: true },
	phone: String,
	telegram_id: { type: String, unique: true },
	email: { type: String, unique: true },
	tree_id: { type: Number, unique: true },
	action_bot: {
		step: { type: String, default: 0 },
		action: {
			type: String,
			enum: ['NONE', 'GET_WALLET', 'GET_COUNTRY'],
			default: 'NONE'
		}
	},
	status: {
		type: String,
		enum: ['ACTIVE', 'COMPANY', 'INACTIVE', 'DEBT'],
		default: 'INACTIVE'
	},
	wallet: {
		id: Number,
		key: { type: String, unique: true },
		status: { type: Boolean, default: false },
		//Acciones para crear o modificar la wallet en el back
		action_wallet: { type: String, default: 'NONE' }
	},
	auth: {
		access_token: String,
		token_type: String,
		expires_in: Date
	},
	period: Date
})

module.exports = mongoose.model('Client', ClientSchema)
