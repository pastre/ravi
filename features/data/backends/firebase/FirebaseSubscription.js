class FirebaseSubscription {
	constructor(id, user, event) {
		this.user = user
		this.event = event
	}
}

module.exports = { FirebaseSubscription }