class AbstractCommand {
	constructor(name, commandArgs, helpDescription) {
		this.name = name
		this.commandArgs = commandArgs
		this.helpDescription = helpDescription
	}

	getResponse = (args) => "Command not found. Try /help"
}

module.exports = { AbstractCommand }