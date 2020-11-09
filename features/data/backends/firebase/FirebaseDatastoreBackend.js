const { AbstractDatastoreBackend } = require('../AbstractDatastoreBackend')
const { FirebaseFacade } = require("./FirebaseFacade")

class FirebaseDatastoreBackend extends AbstractDatastoreBackend {

	constructor() {
		super()
		this.facade = new FirebaseFacade( this.callCachedCallbacks )
	}


	// PUBLIC API
	getEvents = () => this.facade.getEvents()
	getEventByName = (eventName) => this.facade.getEvents().find(event => eventName === event.name)

	getSubscriptions = () => this.facade.getSubscriptions()
	addSubscription(event) {  }
}

module.exports = { FirebaseDatastoreBackend }