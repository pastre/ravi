const DatabaseFacade = require("../../data/Datastore.js" )
const { AbstractCommand } = require('./AbstractCommand')

class EventsCommand extends AbstractCommand {
	constructor() {
		super("events", ["subscribe", "list"], "/events <command> Manage your events")
	}

	onSubscribe = (eventName) => {
		let event = DatabaseFacade.getEventByName(eventName)
		if (!event) { return `Oops! Didn't find this event! <br />${this.helpDescription}`}
		DatabaseFacade.addSubscription(event)
		return `Pronto! Vc sera notificado quando ${event} rolar!`
	}

	onList() {		
		let events = DatabaseFacade.getSubscriptions()
		return `Seus eventos: ${events}`
	}

	getCallback(action) {
		if (action === "subscribe") { return this.onSubscribe }
		if (action === "list") { return this.onList }
		return false
	}

	buildResponse(action, eventName) {
		let callback = this.getCallback(action)
		if (!callback) { return this.helpDescription }
		return callback(eventName)
	}
	
	getResponse = (args) => (args.lenght < 1) ? this.helpDescription : this.buildResponse(args[0], args[1])
}

module.exports = { EventsCommand }