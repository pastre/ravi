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

module.exports = { CommandHandler }