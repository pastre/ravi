//  __   __  ___        ___
// |__) /  \  |  |__/ |  |  
// |__) \__/  |  |  \ |  |  

// This is the main file for the ravi bot.

// Import Botkit's core features
const { Botkit } = require('botkit');

// Import a platform-specific adapter for web.
const { WebAdapter } = require('botbuilder-adapter-web');

// Import module features
const DatabaseFacade = require(__dirname + '/features/data/Datastore')
const { SchedulerFacade } = require(__dirname + '/features/scheduler/Scheduler')

// Load process.env values from .env file
require('dotenv').config();

const adapter = new WebAdapter({});
const controller = new Botkit({
    webhook_uri: '/api/messages',
    adapter: adapter,
});


function setpSubscription(subscription) {
    DatabaseFacade.ready( () => console.log("AEEEEEEEE") )
}

// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {

    // load traditional developer-created local custom feature modules
    controller.loadModule(__dirname + '/features/command_parser.js');
    controller.loadModule(__dirname + '/features/chat.js');

    setpSubscription("a")
    
});





