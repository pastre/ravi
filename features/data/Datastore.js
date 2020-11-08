const MockedDatastoreBackend = require('./backends/MockedDatastoreBackend')
let datastoreBackend = new MockedDatastoreBackend()

getEvents = () => datastoreBackend.getEvents()
getEventByName = (name) => datastoreBackend.getEventByName(name)

getSubscriptions = () => datastoreBackend.getSubscriptions()
addSubscription = (event) => datastoreBackend.addSubscription(event)

module.exports = { getEvents, getSubscriptions, addSubscription, getEventByName  }