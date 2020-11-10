const { AbstractDatastoreBackend } = require('./AbstractDatastoreBackend')
const { User, Event, Subscription } = require("../Model")

class MockedDatastoreBackend extends AbstractDatastoreBackend {
	constructor() {
		super()
		this.user = new User('id', 'teste@gmail.com')
		this.events = [
			new Event(
				'id',
				'every_minute',
				'',
				'minutely'
			)
		]
		this.subscriptions = [
			new Subscription(
				"id",
				this.user,
				this.events[0]
			)
		]
		this.callCachedCallbacks()
	}

	getEvents = () => this.events
	getEventByName = (eventName) => this.events.find(event => eventName === event)
	getSubscriptions = () => this.subscriptions
	addSubscription(event) { this.subscriptions.push(event) }
}

module.exports = { MockedDatastoreBackend }