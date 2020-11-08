const { AbstractDatastoreBackend } = require('../AbstractDatastoreBackend')
const { FirebaseFacade } = require("./FirebaseFacade")

class FirebaseDatastoreBackend extends AbstractDatastoreBackend {

	constructor() {
		super()
		this.facade = new FirebaseFacade()
	}


	// PUBLIC API
	getEvents = () => this.facade.getEvents().flatMap(e => e.name)
	getEventByName = (eventName) => this.facade.getEvents().find(event => eventName === event.name).name

	getSubscriptions = () => this.facade.getSubscriptions().flatMap(s => s.event.name)
	addSubscription(event) {  }
}

module.exports = { FirebaseDatastoreBackend }