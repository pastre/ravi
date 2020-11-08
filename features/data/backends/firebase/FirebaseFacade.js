var admin = require("firebase-admin");
const { FirebaseEvent } = require("./FirebaseEvent")
const { FirebaseSubscription } = require("./FirebaseSubscription")

let userEmail = "test1e@gmail.com"

class User {
	constructor(id, email) {
		this.id = id
		this.email = email
	}
}

class FirebaseFacade {
	constructor() {
		this.initFirebase()
		this.bootFirebase()
	}

	initFirebase() {
		var serviceAccount = require("./firebase-key.json");
		admin.initializeApp({
		  credential: admin.credential.cert(serviceAccount),
		  databaseURL: "https://ravi-126f9.firebaseio.com"
		});

		this.db = admin.firestore();
	}

	async bootFirebase() {
		await this.loadUser()
		await this.loadEvents()
		this.loadSubscriptions()
	}

	async loadUser() {
		let userSnapshot = await this.db.collection('users').get()
		userSnapshot.forEach ( doc => {
			if (!doc.data().email === userEmail) { return }
			this.user = new User(doc.id, doc.data().email)
		})
		console.log(JSON.stringify(this.user))
		if(this.user) { return }
			// TODO Create new user
	}

	async loadEvents() {
		this.events = []
		let snapshot = await this.db.collection('events').get()

		snapshot.forEach( doc => {
	    	let newEvent = this.loadEvent(doc.id, doc.data())
	    	console.log(JSON.stringify(newEvent))
	    	this.events.push(newEvent)
		})
	}

	async loadSubscriptions() {
		this.subscriptions = []
		let userPath = this.db.collection('users').doc(this.user.id)
		let snapshot = await this.db.collection('subscriptions').get()
		
	    snapshot.forEach( async (doc) => {
	    	if (doc.data().user.id != this.user.id) { return }

			let firebaseEvent = await doc.data().event.get()
			let event = this.loadEvent(firebaseEvent.id, firebaseEvent.data())
			let newSubscription = this.loadSubscription(this.user, event)
			console.log(JSON.stringify(newSubscription))
			this.subscriptions.push(newSubscription)
		})
	}

	// PRIVATE API
	getEvents = () => this.events
	findEvent = (id) => this.events.find(e => e.id === id)
	loadEvent = (id, snapshot) => {
		let cached = this.findEvent(id)
		if (cached) { return cached }
		if (snapshot) { return new FirebaseEvent(id, snapshot.name, snapshot.triggerTimestamp, snapshot.type) }	
	}

	loadSubscription = (id, snapshot) => new FirebaseSubscription(id, snapshot)
	getSubscriptions = () => this.subscriptions
}

module.exports = { FirebaseFacade }