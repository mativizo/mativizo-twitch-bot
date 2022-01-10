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
    const userTags = getUserTags(tags, db)
    
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
                let returnedValue = await tempCmd.execute(channel, tags, message, client, lowerMessage, userTags, db, args);
                if (tempCmd.dbSensitive) {
                    if (Object.keys(returnedValue).includes('db')) {
                        db = returnedValue.db;
                        savedb(db);
                    }
                }
                return;
            }
        }
        // Triggers
        

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