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
}

module.exports = { FirebaseUser, FirebaseEvent, FirebaseSubscription }