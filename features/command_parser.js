const { CommandProvider } = require("./command/CommandProvider.js" )
const { CommandHandler } = require("./command/CommandHandler.js" )

module.exports = function(controller) {

    controller.hears(new RegExp(/^\/\w+/),'message,direct_message', async(bot, message) => {
    	let manager = new CommandProvider()
    	let handler = new CommandHandler(message.text, manager) 
    	let answer = handler.getReply()
        await bot.reply(message, answer);
    });
}
