var admin = require("firebase-admin");
const { User, Event, Subscription } = require("./Model")

let userEmail = "test1e@gmail.com"

class FirebaseFacade {

	constructor(k) {
		this.loadedCallback = () => k()
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
		this.loadSubscriptions().then( () =>  this.loadedCallback() )
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
		
		var toParse = []

	    snapshot.forEach( (doc) => {
	    	if (doc.data().user.id != this.user.id) { return }
	    	toParse.push(doc)
		})

	    for (var i = toParse.length - 1; i >= 0; i--) {
	    	await this.parse(toParse[i])
	    }
	}

	async parse(doc) {
		let firebaseEvent = await doc.data().event.get()
		let event = this.loadEvent(firebaseEvent.id, firebaseEvent.data())
		let newSubscription = this.loadSubscription(doc.id, this.user, event)
		console.log(JSON.stringify(newSubscription))
		this.subscriptions.push(newSubscription)
	}

	// PRIVATE API
	getEvents = () => this.events
	findEvent = (id) => this.events.find(e => e.id === id)
	loadEvent = (id, snapshot) =>  this.findEvent(id) || new Event(id, snapshot.name, snapshot.triggerTimestamp, snapshot.type)

	loadSubscription = (id, user, event) => new Subscription(id, user, event)
	getSubscriptions = () => this.subscriptions
}

module.exports = { FirebaseFacade }