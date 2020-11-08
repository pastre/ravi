class AbstractDatastoreBackend {
	getEvents = () => { throw "did not implement getEvents" }
	getSubscriptions = () => { throw "did not implement getSubscriptions" }
	addSubscription = (event) => { throw "did not implement addSubscription" }
	getEventByName = (eventName) => { throw "did not implement getEventByName" }
}

module.exports = { AbstractDatastoreBackend }