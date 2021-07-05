'use strict'

class ClientReferralsDomain {
	constructor({ ClientRepository }) {
		this.clientRepository = ClientRepository
	}

	async getClientReferrals(CTX, value) {
		try {
			let client = {},
				authClient = await this.clientRepository.getClientWithReferrals(
					CTX.client.client_id,
					CTX.accessToken
				)
			if (!authClient.tree) return { data: null }
			switch (value) {
				case 'REFERAL_LEFT':
					client.title = 'Referido Izquierdo'
					client.data = authClient.tree.left_children_tree
						? authClient.tree.left_children_tree.client
						: null
					return client
				case 'REFERAL_CENTER':
					client.title = 'Referido Central'
					client.data = authClient.tree.center_children_tree
						? authClient.tree.center_children_tree.client
						: null
					return client
				case 'REFERAL_RIGTH':
					client.title = 'Referido Derecho'
					client.data = authClient.tree.right_children_tree
						? authClient.tree.right_children_tree.client
						: null
					return client
				case 'GENERATION_1':
					client.title = 'Generación 1 (Padre)'
					client.data = authClient.tree.generation1_father_tree
						? authClient.tree.generation1_father_tree.client
						: null
					return client
				case 'GENERATION_2':
					client.title = 'Generación 2 (Abuelo)'
					client.data = authClient.tree.generation2_father_tree
						? authClient.tree.generation2_father_tree.client
						: null
					return client
				case 'GENERATION_3':
					client.title = 'Generación 3 (Bisabuelo)'
					client.data = authClient.tree.generation3_father_tree
						? authClient.tree.generation3_father_tree.client
						: null
					return client
				case 'SPONSOR':
					client.title = 'Patrocinador'
					client.data = authClient.sponsor ? authClient.sponsor : null
					return client
				default:
					return { data: null }
			}
		} catch (error) {
			throw new Error(error)
		}
	}
}
module.exports = ClientReferralsDomain
