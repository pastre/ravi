const { EventsCommand } = require('./commands/EventsCommand')
const { HelpCommand } = require('./commands/HelpCommand')

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


module.exports = { CommandProvider }