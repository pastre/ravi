const { AbstractCommand } = require('./AbstractCommand')

class HelpCommand extends AbstractCommand {
	constructor(commandArgs, commandProvider) {
		super("help", commandArgs, "/help &lt;command&gt;\u2001-\u2001Presents all available commands")
		this.commandProvider = commandProvider
	}
	getResponse = () => this.commandProvider.getCommands().flatMap( this.getCommandHelpDescription ).join("<br />") || super.getResponse()
	getCommandHelpDescription = (command) => `${command.helpDescription}`
}

module.exports = { HelpCommand }