'use strict'

module.exports = {
	/*
	 * Id del los terminos por defecto
	 */
	GENERAL_TERM: 1,
	DEFAULT_PLAN: 1,
	CREATE_WALLET: 'CREATE_WALLET',
	UPDATE_WALLET: 'UPDATE_WALLET',
	GET_WALLET: 'GET_WALLET',
	GET_COUNTRY: 'GET_COUNTRY',
	VALIDATE_TRANSACTION_STATUS: ['EXCEEDED', 'COMPLETE'],
	URL_REFERRED: 'https://t.me/ahorroFacilBot?start=#',
	STATUS: {
		ACTIVE: 'Activo',
		INFO: 'Perfil Incompleto',
		COMPANY: 'Inactivo',
		DEBT: 'Inactivo',
		INACTIVE: 'Inactivo'
	},
	INFO: {
		phone: 'el *Teléfono*',
		email: 'el *Email*',
		country: 'el *País*',
		birthday: 'la *Fecha de nacimiento*'
	},
	ACTIONS: {
		GET_WALLET: 'una *dirección tron*',
		GET_COUNTRY: 'un *país a seleccionar*',
		GET_PHONE: 'un *teléfono*',
		GET_EMAIL: 'un *correo electrónico*'
	}
}
