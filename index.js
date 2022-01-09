// Mativizo Twitch Bot

// Requires
const fs = require('fs')
const tmi = require('tmi.js');
require('dotenv').config();
const { getCmdAndArgs, loaddb, savedb, getRandomItem, getUserTags, checkPermissions } = require('./src/utils')

// Database - will be changed in future
let db = {};
db = loaddb();

console.log("🤖 Bot started.")

const reloadCommands = () => {
    const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
    let commands = {}

    for (const file of commandFiles) {
        delete require.cache[require.resolve(`./src/commands/${file}`)];
	    const command = require(`./src/commands/${file}`);
	    commands[command.name] = command;
        console.log(commands[command.name].notAllowedPermissions)
    }

    console.log(`🔃 Reloaded ${Object.keys(commands).length} command(s).`)
    return commands;
}

// Connect to Twitch
const client = new tmi.Client({
    connection: { reconnect: true },
    channels: [ process.env.TWITCH_TARGET_CHANNEL ],
    identity: {
        username: process.env.TWITCH_USERNAME,
        password: process.env.TWITCH_AUTH_TOKEN
    }
});
client.connect();

// Listen to "connect" event
client.on('connected', () => {
    console.log(`🤖 Connected to @${process.env.TWITCH_TARGET_CHANNEL} as ${process.env.TWITCH_USERNAME}.`)
    client.reloadCommands = reloadCommands;
    client.commands = client.reloadCommands();
});

// Listen to "message" event
client.on('message', async (channel, tags, message, self) => {
    console.log(`📨 ${tags['display-name']}: ${message}`)

    // If message is from bot return
    if (self) return;

    // Extract important tags
    const userTags = getUserTags(tags)
    
    // Get lowercase version of message
    const lowerMessage = message.toLowerCase();

    // If message starts with prefix - it's command
    if (message.startsWith(db.config.prefix)) {

        // Extract command and arguments from message
        const { cmd, args } = getCmdAndArgs(message, db.config.prefix);
        
        for (commandName of Object.keys(client.commands)) {
            let tempCmd = client.commands[commandName];
            if (tempCmd.aliases.includes(cmd)) {
                if (!checkPermissions(userTags, tempCmd)) return;
                let returnedValue = await tempCmd.execute(channel, tags, message, client, lowerMessage, userTags, db);
                if (tempCmd.dbSensitive) {
                    db = returnedValue.db;
                    savedb();
                }

                return;
            }
        }
        // Triggers
        if (cmd == "greetings" && isStreamer) {
            if (args.length < 1) return;

            let subcommand = args.shift();

            if (subcommand == "add") {
                if (args < 2) {
                    return await client.say(channel, `${db.config.prefix}greetings add command need min. two arguments (greetings add trigger <trigger> or greetings add response <response>).`)
                }

                let triggerOrResponse = args.shift()
                triggerOrResponse = triggerOrResponse.toLowerCase();

                if (triggerOrResponse == "trigger") {
                    let newTrigger = args.join(" ")
                    if (newTrigger.length < 2) return await client.say(channel, `New trigger needs to be atleast 2 chars long.`)
                    db.greetings.triggers.push(newTrigger.toLowerCase())
                    savedb(db);
                    return await client.say(channel, `Greetings trigger "${newTrigger}" added successfully!`)
                } else if (triggerOrResponse == "response") {
                    let newResponse = args.join(" ")
                    if (newResponse.length < 1) return await client.say(channel, `New response can't be empty.`)
                    db.greetings.responses.push(newResponse)
                    savedb(db);
                    return await client.say(channel, `Greetings response "${newResponse}" added successfully!`)
                } else {
                    return await client.say(channel, `Wrong usage, try to specify type by "trigger" or "reponse".`)
                }
            } else if (subcommand == "list") {
                if (args < 1) {
                    return await client.say(channel, `You need to specify, what you want to see (triggers or responses).`)
                }

                let triggersOrResponses = args[0].toLowerCase()

                if (triggersOrResponses == "triggers") {
                    let triggers = ""
                    for (let i = 1; i <= db.greetings.triggers.length; i++) {
                        if (i != 1) triggers += "|"
                        triggers += `${i}. "${db.greetings.triggers[i-1]}" `
                    }
                    return await client.say(channel, `Greetings triggers: ${triggers} - To remove trigger use !greetings remove trigger <id>`)
                } else if (triggersOrResponses == "responses") {
                    let responses = ""
                    for (let i = 1; i <= db.greetings.responses.length; i++) {
                        if (i != 1) triggers += "|"
                        responses += `${i}. "${db.greetings.responses[i-1]}" `
                    }
                    return await client.say(channel, `Greetings responses: ${triggers} - To remove trigger use !greetings remove response <id>`)
                } else {
                    return await client.say(channel, `Wrong usage, try to specify type by "trigger" or "reponse".`)
                }
            } else if (subcommand == "list") {
                if (args < 1) {
                    return await client.say(channel, `You need to specify, what you want to see (triggers or responses).`)
                }

                let triggersOrResponses = args[0].toLowerCase()

                if (triggersOrResponses == "triggers") {
                    let triggers = ""
                    for (let i = 1; i <= db.greetings.triggers.length; i++) {
                        if (i != 1) triggers += "|"
                        triggers += `${i}. "${db.greetings.triggers[i-1]}" `
                    }
                    return await client.say(channel, `Greetings triggers: ${triggers} - To remove trigger use !greetings remove trigger <id>`)
                } else if (triggersOrResponses == "responses") {
                    let responses = ""
                    for (let i = 1; i <= db.greetings.responses.length; i++) {
                        if (i != 1) triggers += "|"
                        responses += `${i}. "${db.greetings.responses[i-1]}" `
                    }
                    return await client.say(channel, `Greetings responses: ${triggers} - To remove trigger use !greetings remove response <id>`)
                } else {
                    return await client.say(channel, `Wrong usage, try to specify type by "trigger" or "reponse".`)
                }
            } else if (subcommand == "remove") {
                if (args < 2) {
                    return await client.say(channel, `You need to specify what you want to remove (!greetings trigger <id>).`)
                }

                let triggerOrResponse = args[0].toLowerCase()
                let id = parseInt(args[1])

                if (triggerOrResponse == "trigger") {
                    if (id < 1 || id > db.greetings.triggers.length) {
                        return await client.say(channel, `Wrong ID. You need to specify ID in range from 1 to ${db.greetings.triggers.length}. To see list of triggers type !greetings list triggers`)
                    }

                    let removedTrigger = ""

                    db.greetings.triggers = db.greetings.triggers.filter((v,i) => {
                        if (i == id-1) {
                            removedTrigger = v;
                            return false;
                        }
                        return true
                    });
                    savedb(db)
                    return await client.say(channel, `Greetings trigger "${removedTrigger}" removed successfully!`)
                } else if (triggerOrResponse == "response") {
                    if (id < 1 || id > db.greetings.responses.length) {
                        return await client.say(channel, `Wrong ID. You need to specify ID in range from 1 to ${db.greetings.responses.length}. To see list of triggers type !greetings list responses`)
                    }

                    let removedResponse = ""

                    db.greetings.responses = db.greetings.responses.filter((v,i) => {
                        if (i == id-1) {
                            removedResponse = v;
                            return false;
                        }
                        return true
                    });
                    return await client.say(channel, `Greetings response "${removedTrigger}" removed successfully!`)
                } else {
                    return await client.say(channel, `Wrong usage, try to specify type by "trigger" or "reponse".`)
                }
            }
        }

        if (cmd == "goodbyes") {

        }

        // Todo: command handler

    } else {
        // If message isn't a command

        // If Greetings trigger is enabled
        if (db.greetings.enabled) {

            // Loop through triggers and check if message contains any
            db.greetings.triggers.forEach(async (trigger) => {
                if (lowerMessage.includes(trigger)) {
                    // Get random response and send to chat
                    let response = getRandomItem(db.greetings.responses);
                    return await client.say(channel, `@${tags['display-name']} ${response}`);
                }
            })
        }

        // If Goodbyes trigger is enabled
        if (db.goodbyes.enabled) {
            
            // Loop through triggers and check if message contains any
            db.goodbyes.triggers.forEach(async (trigger) => {
                if (lowerMessage.includes(trigger)) {
                    // Get random response and send to chat
                    let response = getRandomItem(db.goodbyes.responses);
                    return await client.say(channel, `@${tags['display-name']} ${response}`);
                }
            })
        }

    }
});


