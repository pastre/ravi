const { MockedDatastoreBackend } = require('./backends/MockedDatastoreBackend')
const { FirebaseDatastoreBackend } = require('./backends/firebase/FirebaseDatastoreBackend')
let datastoreBackend = new FirebaseDatastoreBackend()

getEvents = () => datastoreBackend.getEvents()
getEventByName = (name) => datastoreBackend.getEventByName(name)

getSubscriptions = () => datastoreBackend.getSubscriptions()
addSubscription = (event) => datastoreBackend.addSubscription(event)

module.exports = { getEvents, getSubscriptions, addSubscription, getEventByName  }