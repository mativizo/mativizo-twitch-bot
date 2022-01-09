module.exports = {
    name: "reload",
    description: { pl: `🤖 odświeża komendy!`, en: `🤖 refresh commands!` },
    aliases: ["reload"],
    usage: "reload",
    allowedPermissions: ["streamer"],
    notAllowedPermissions: [],
    dbSensitive: false,
    execute: async (channel, tags, message, client, lowerMessage, userTags, db) => {
        client.commands = client.reloadCommands()
        return await client.say(channel, `Reloaded ${Object.keys(client.commands).length} command(s).`);
    }
}