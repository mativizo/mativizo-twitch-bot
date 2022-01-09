module.exports = {
    name: "commands",
    description: { pl: `🤖 wyświetla listę komend.`, en: `🤖 shows all commands.` },
    aliases: ["cmds", "commands", "komendy"],
    usage: "cmds",
    allowedPermissions: [],
    notAllowedPermissions: [],
    dbSensitive: false,
    execute: async (channel, tags, message, client, lowerMessage, userTags, db, args) => {
        let commands = Object.keys(client.commands);
        if (db.config.language == "en") {
            return await client.say(channel, `Commands: ${commands.join(", ")}. To see more info about command use ${db.config.prefix}help <command>.`);
        } else if (db.config.language == "pl") {
            return await client.say(channel, `Komendy: ${commands.join(", ")}. Aby dowiedzieć się więcej na temat komendy wpisz: ${db.config.prefix}help <nazwaKomendy>.`);
        }
        

    }
}