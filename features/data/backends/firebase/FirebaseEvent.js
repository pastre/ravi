class FirebaseEvent {
	constructor(id, name, triggerTimestamp, type) {
		this.id = id
		this.name = name 
		this.triggerTimestamp = triggerTimestamp 
		this.type = type 
	}
}

module.exports = { FirebaseEvent }