// Mativizo Twitch Bot
const tmi = require('tmi.js');
require('dotenv').config();
const { getCmdAndArgs } = require('./src/utils')

console.log("🤖 Bot started.")

const client = new tmi.Client({
    connection: { reconnect: true },
    channels: [ process.env.TWITCH_TARGET_CHANNEL ]
});

client.connect();

client.on('connected', () => console.log("🤖 Connected to Twitch Chat."));

client.on('message', (channel, tags, message, self) => {
    console.log(`📨 ${tags['display-name']}: ${message}`)

    const lowerMessage = message.toLowerCase();

    if (message.startsWith(process.env.PREFIX)) {
        const { cmd, args } = getCmdAndArgs(message, process.env.PREFIX);
        console.log("CMD: ", cmd, "Args: ", args)
    }
});