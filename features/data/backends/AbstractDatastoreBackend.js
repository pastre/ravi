class AbstractDatastoreBackend {

	constructor() {
		this.onReadyCallbacks = []
		this.isReady = false
	}

	getEvents = () => { throw "did not implement getEvents" }
	getSubscriptions = () => { throw "did not implement getSubscriptions" }
	addSubscription = (event) => { throw "did not implement addSubscription" }
	getEventByName = (eventName) => { throw "did not implement getEventByName" }

	ready(callback) {
		if (this.isReady) { callback() }
		else { this.onReadyCallbacks.push(callback) }
	}

	callCachedCallbacks = () =>  {
		this.isReady = true
		this.onReadyCallbacks.forEach( c => c() )
	}

}

module.exports = { AbstractDatastoreBackend }