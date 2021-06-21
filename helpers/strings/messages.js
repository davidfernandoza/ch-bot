'use strict'

module.exports = {
	/*
	 * Errores
	 */
	serverError:
		'El chat en este momento no esta disponible, intenta mas tarde o contacte a soporte.',
	isBot: 'No puede ser un bot para usar este chat.',
	clientExistError: 'Bienvenido de nuevo.',
	addresUnavalible:
		'La direccion de tron no es valida, intenta enviarla otra vez.',
	clientExistError: 'El usuario ya existe en el sistema.',
	clientNotExistError: 'El usuario no existe en el sistema.',

	// msgA -> Alertas

	// Información
	registerRule:
		'¡Hola! #NAME, pon mucha atención a las reglas de Cadena ahorro: \n\n#TERM \n\n Plan de ahorro:\n\n #PLAN',
	succesClient: '¡Se ha creado el usuario con exito!',
	sendTronAddress:
		'Por favor envie su direccion tron \nNota: Tenga en cuenta que desde esta direccion tron se debe enviar las consignaciones y en esta misma recibira los pagos.',
	sendWalletConsignment:
		'Envia la cantidad de #AMOUNT QFS a la dirección:\n\n#KEY\n(Puedes escanear el codigo QR)\n\n- Despues de hacer la consignación solicita la validacion de esta.\nNota: corrobore bien la dirección tron que asigno a su cuenta antes de hacer la consignación, ya que con dicha dirección se validara la transacción.\n\n- Si la dirección tron que previamente asigno a su cuenta no es correcta, la puedes cambiar.',
	transactionComplete:
		'Transacción ejecutada correctamente.\nEstas activo hasta #DATE',
	transactionNone:
		'En el momento no se encuentra ninguna transacción en cola, espera un momento y vuélvelo a intentar.',
	transactionIncomplete:
		'Hay varias transacciones que no completan el valor total de #TOTAL QFS para la consignacion, hace fatal #AMOUNT QFS para activar la cuenta.\n\nUsar el anterior codigo QR o envia la cantidad de #AMOUNT QFS a la siguiente direccion: \n\n#KEY \n\n'
}
