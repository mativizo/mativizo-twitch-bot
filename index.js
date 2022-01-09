// Mativizo Twitch Bot
const tmi = require('tmi.js');
require('dotenv').config();
const { getCmdAndArgs, loaddb, savedb, getRandomItem } = require('./src/utils')

let db = {};
db = loaddb();

console.log("🤖 Bot started.")

const client = new tmi.Client({
    connection: { reconnect: true },
    channels: [ process.env.TWITCH_TARGET_CHANNEL ],
    identity: {
        username: process.env.TWITCH_USERNAME,
        password: process.env.TWITCH_AUTH_TOKEN
    }
});

client.connect();

client.on('connected', () => {
    console.log(`🤖 Connected to @${process.env.TWITCH_TARGET_CHANNEL} as ${process.env.TWITCH_USERNAME}.`)
});

client.on('message', async (channel, tags, message, self) => {
    console.log(`📨 ${tags['display-name']}: ${message}`)
    if (tags.username.toLowerCase() == process.env.TWITCH_USERNAME.toLowerCase()) return;
    const lowerMessage = message.toLowerCase();

    if (message.startsWith(process.env.PREFIX)) {
        const { cmd, args } = getCmdAndArgs(message, process.env.PREFIX);
        console.log("CMD: ", cmd, "Args: ", args)

        if (cmd == "ping") {
            return await client.say(channel, `Pong!`)
        }
    } else {

        if (db.greetings.enabled) {
            db.greetings.triggers.forEach(async (trigger) => {
                if (lowerMessage.includes(trigger)) {
                    let response = getRandomItem(db.greetings.responses);
                    return await client.say(channel, `@${tags['display-name']} ${response}`);
                }
            })
        }

        if (db.goodbyes.enabled) {
            db.goodbyes.triggers.forEach(async (trigger) => {
                if (lowerMessage.includes(trigger)) {
                    let response = getRandomItem(db.goodbyes.responses);
                    return await client.say(channel, `@${tags['display-name']} ${response}`);
                }
            })
        }

    }
});