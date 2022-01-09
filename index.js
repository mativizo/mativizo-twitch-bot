// Mativizo Twitch Bot

// Requires
const tmi = require('tmi.js');
require('dotenv').config();
const { getCmdAndArgs, loaddb, savedb, getRandomItem } = require('./src/utils')

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
    
    // Get lowercase version of message
    const lowerMessage = message.toLowerCase();

    // If message starts with prefix - it's command
    if (message.startsWith(process.env.PREFIX)) {

        // Extract command and arguments from message
        const { cmd, args } = getCmdAndArgs(message, process.env.PREFIX);

        // Test command
        if (cmd == "ping") {
            return await client.say(channel, `Pong!`)
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