const { MockedDatastoreBackend } = require('./backends/MockedDatastoreBackend')
const { FirebaseDatastoreBackend } = require('./backends/firebase/FirebaseDatastoreBackend')
let datastoreBackend = new MockedDatastoreBackend()

getEvents = () => datastoreBackend.getEvents()
getEventByName = (name) => datastoreBackend.getEventByName(name)

getSubscriptions = () => datastoreBackend.getSubscriptions()
addSubscription = (event) => datastoreBackend.addSubscription(event)

ready = (callback) => datastoreBackend.ready(callback)

module.exports = { getEvents, getSubscriptions, addSubscription, getEventByName, ready }