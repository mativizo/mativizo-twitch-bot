module.exports = {
    name: { pl: "Ping", en: "Ping" },
    description: { pl: `🤖 odpowiada Pong!`, en: `🤖 says Pong!` },
    aliases: ["ping", "test"],
    usage: "ping",
    allowedPermissions: [],
    notAllowedPermissions: [],
    dbSensitive: false,
    execute: async (channel, tags, message, client, lowerMessage, userTags, db) => {
        return await client.say(channel, `Pong!`);
    }
}