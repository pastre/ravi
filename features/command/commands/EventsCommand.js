const DatabaseFacade = require("../../data/Datastore.js" )
const { AbstractCommand } = require('./AbstractCommand')

class EventsCommand extends AbstractCommand {
	constructor() {
		super("events", ["subscribe", "list"], "/events <command> Manage your events")
	}

	onSubscribe = (eventName) => {
		let event = DatabaseFacade.getEventByName(eventName)
		if (!event) { return `Oops! Didn't find this event!`}
		DatabaseFacade.addSubscription(event)
		return `Pronto! Vc sera notificado quando ${event} rolar!`
	}

	onList() {		
		let subscribedEvents = DatabaseFacade.getSubscriptions().flatMap(s => s.event.getAnswerText()).join("<br />")
		let unsubscribedEvents = DatabaseFacade.getEvents().flatMap(e => e.getAnswerText()).join("<br />")//.filter( e => !subscribedEvents.includes(e).flatMap(e => e.name) )
		return `<b>Seus eventos:</b><br /> ${subscribedEvents}<br /><b>Todos os eventos:</b><br />${unsubscribedEvents}<br /> Para receber alertas de algum evento, digite <b>&#47;event subscribe <i>nome&#95;do&#95;evento</i></b>`
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