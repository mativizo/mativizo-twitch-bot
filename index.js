// Mativizo Twitch Bot

// Requires
const tmi = require('tmi.js');
require('dotenv').config();
const { getCmdAndArgs, loaddb, savedb, getRandomItem, getUserTags } = require('./src/utils')

// Database - will be changed in future
let db = {};
db = loaddb();

console.log("🤖 Bot started.")

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
});

// Listen to "message" event
client.on('message', async (channel, tags, message, self) => {
    console.log(`📨 ${tags['display-name']}: ${message}`)

    // If message is from bot return
    if (tags.username.toLowerCase() == process.env.TWITCH_USERNAME.toLowerCase()) return;

    // Extract important tags
    const {color, userId, isMod, isStreamer, isSub, isTurbo, isVip} = getUserTags(tags)
    
    // Get lowercase version of message
    const lowerMessage = message.toLowerCase();

    // If message starts with prefix - it's command
    if (message.startsWith(db.config.prefix)) {

        // Extract command and arguments from message
        const { cmd, args } = getCmdAndArgs(message, db.config.prefix);

        // Test command
        if (cmd == "ping") {
            return await client.say(channel, `Pong!`)
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