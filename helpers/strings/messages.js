'use strict'

module.exports = {
	serverError:
		'El chat en este momento no esta disponible, intenta mas tarde o contacte a soporte.',
	isBot: 'No puede ser un bot para usar este chat.',
	addresUnavalible:
		'La direccion de tron no es valida, intenta enviarla otra vez.',

	clientExistError:
		'El usuario ya existe en el sistema. \nUsa el comando /menu para abrir el menu del usuario. \n\nÓ usa el siguiente boton.',
	clientNotExistError:
		'El usuario no existe en el sistema. \nUsa el comando /start para crear un nuevo usuario. \n\nÓ usa el siguiente boton',
	clientNotActive:
		'El usuario no esta activo en la plataforma debe de hacer la siguiente transaccion.',

	webKvalidate:
		'Hola!! Si estas en la plataforma web de "*Telegram WebK*" o la plataforma web de "*Telegram WebZ*" te recomendamos que descargues la aplicacion de escritorio para tu sistema operativo correspondiente, ya que dischas plataformas web estan limitadas para todas las opciones del BOT.\n\nPuedes decargar telegram para tu sistema operativo desde el siguiente link.\n\nhttps://telegram.org/apps',

	registerRule:
		'¡Hola! #NAME, pon mucha atención a las reglas de Cadena ahorro: \n\n#TERM \n\nPlan de ahorro:\n\n #PLAN',
	succesClient: '¡Se ha creado el usuario con exito!',
	sendTronAddress:
		'Por favor envie su direccion tron. \n\n*Nota*: Tenga en cuenta que desde esta direccion tron se debe enviar las consignaciones y en esta misma recibira los pagos.',
	sendWalletConsignment:
		'Envia la cantidad de #AMOUNT QFS a la dirección:\n\n#KEY\n(Puedes escanear el codigo QR)\n\n- Despues de hacer la consignación solicita la validacion de esta.',
	sendChangeToWallet:
		'*Nota*: corrobore la dirección tron que asigno a su cuenta antes de hacer la consignación, ya que con dicha dirección se validara la transacción.\n\n- Si la dirección tron que previamente asigno a su cuenta no es correcta, la puedes cambiar.',
	wishChangeToWallet:
		'Si quieres cambiar tu direccion tron puedes hacerlo con el siguiente boton.',
	transactionComplete:
		'Transacción ejecutada correctamente.\nEstas activo hasta #DATE.',
	transactionNone:
		'En el momento no se encuentra ninguna transacción en cola, espera un momento y vuélvelo a intentar.',
	transactionIncomplete:
		'Hay varias transacciones que no completan el valor total de #TOTAL QFS para la consignacion, hace fatal #AMOUNT QFS para activar la cuenta.\n\nUsar el anterior codigo QR o envia la cantidad de #AMOUNT QFS a la siguiente direccion: \n\n#KEY \n\n',
	referred:
		'*#TITLE*\n\n*Nombre*: #NAME\n*Estado*: #STATUS\n*Telefono*: #PHONE\n*Pais*: #COUNTRY\n*Cumpleaños (mes-dia)*: #BIRTHDAY',
	notReferred: 'No existe usuario en esta posición.',
	infoValidate:
		'Falta información personal para que puedas seguir usando el Bot\nEmpieza por #INFO'
}
