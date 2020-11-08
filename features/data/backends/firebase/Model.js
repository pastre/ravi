class FirebaseSubscription {
	constructor(id, user, event) {
		this.user = user
		this.event = event
	}
}

class FirebaseUser {
	constructor(id, email) {
		this.id = id
		this.email = email
	}
}

class FirebaseEvent {
	constructor(id, name, triggerTimestamp, type) {
		this.id = id
		this.name = name 
		this.triggerTimestamp = triggerTimestamp 
		this.type = type 
	}

	getAnswerText = () => {
		return `&bull;${this.name}<br />${this.getFrequencyText()}`
	}

	getFrequencyText() {
		if (this.type === "once") { return this.getOnceFrequency() }
		return this.getWeeklyFrequency()
	}

	getOnceFrequency() {
		const options = {  year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

		return `Quando:${this.getDate().toLocaleDateString('pt-BR', options)}`
	}

	getWeeklyFrequency() {
		let dias = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]
		let day = dias[this.getDate().getDay()]
		let time = `${this.getDate().getHours()}h${this.getDate().getMinutes()}`
		return `Quando: Toda ${day} às ${time}<br />`
	}

	getDate = () => this.triggerTimestamp.toDate()

}

module.exports = { FirebaseUser, FirebaseEvent, FirebaseSubscription }