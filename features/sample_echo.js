// import { DatabaseFacade } from "./data/Datastore.js" 
const DatabaseFacade = require("./data/Datastore.js" )

class AbstractCommand {
	constructor(name, commandArgs, helpDescription) {
		this.name = name
		this.commandArgs = commandArgs
		this.helpDescription = helpDescription
	}

	getResponse = (args) => "Command not found. Try /help"
}

class HelpCommand extends AbstractCommand {
	constructor(commandArgs, commandProvider) {
		super("help", commandArgs, "/help &lt;command&gt;\u2001-\u2001Presents all available commands")
		this.commandProvider = commandProvider
	}
	getResponse = () => this.commandProvider.getCommands().flatMap( this.getCommandHelpDescription ).join("<br />") || super.getResponse()
	getCommandHelpDescription = (command) => `${command.helpDescription}`
}

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

class CommandProvider {

	constructor() {
		this.commands = [
			new EventsCommand()
		]

		let names = this.commands.flatMap( command => command.name ) 
		this.commands.push(new HelpCommand(names, this))
	}

	getCommand = (named) =>  this.commands.find( command => named === command.name )
	getCommands = () => this.commands
}

class CommandHandler {

	constructor(messageText, commandProvider) {
		this.commandProvider = commandProvider

 		let splitted = messageText.replace('/', '').split(' ')
		this.commandName = splitted.slice(0, 1)[0]
		this.commandArgs = splitted.slice(1)
	}

	getReply() {
		let command = this.commandProvider.getCommand(this.commandName)
		if (command === undefined) {
			return "Command not found! Try /help the see all available commands" 
		}
		return command.getResponse(this.commandArgs)
	}
}

module.exports = function(controller) {

    controller.hears(new RegExp(/^\/\w+/),'message,direct_message', async(bot, message) => {
    	let manager = new CommandProvider()
    	let handler = new CommandHandler(message.text, manager) 
    	let answer = handler.getReply()
        await bot.reply(message, answer);
    });
}
