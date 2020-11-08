class AbstractDatastoreBackend {
	getEvents = () => { throw "did not implement getEvents" }
	getSubscriptions = () => { throw "did not implement getSubscriptions" }
	addSubscription = (event) => { throw "did not implement addSubscription" }
	getEventByName = (eventName) => { throw "did not implement getEventByName" }
}

class MockedDatastoreBackend {
	constructor() {
		this.events = ["get_together", "apple_talk"]
		this.subscriptions = ['event']
	}

	getEvents = () => this.events
	getEventByName = (eventName) => this.events.find(event => eventName === event)
	getSubscriptions = () => this.subscriptions
	addSubscription(event) { this.subscriptions.push(event) }
}

let datastoreBackend = new MockedDatastoreBackend()

getEvents = () => datastoreBackend.getEvents()
getEventByName = (name) => datastoreBackend.getEventByName(name)

getSubscriptions = () => datastoreBackend.getSubscriptions()
addSubscription = (event) => datastoreBackend.addSubscription(event)

module.exports = { getEvents, getSubscriptions, addSubscription, getEventByName  }