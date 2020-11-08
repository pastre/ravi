const { AbstractDatastoreBackend } = require('./AbstractDatastoreBackend')

class MockedDatastoreBackend extends AbstractDatastoreBackend {
	constructor() {
		this.events = ["get_together", "apple_talk"]
		this.subscriptions = ['event']
	}

	getEvents = () => this.events
	getEventByName = (eventName) => this.events.find(event => eventName === event)
	getSubscriptions = () => this.subscriptions
	addSubscription(event) { this.subscriptions.push(event) }
}

module.exports = { MockedDatastoreBackend }