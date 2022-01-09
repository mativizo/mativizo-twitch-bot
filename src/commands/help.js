module.exports = {
    name: "help",
    description: { pl: `🤖 wyświetla pomoc do podanej komendy.`, en: `🤖 showing help info about command.` },
    aliases: ["help", "pomoc"],
    usage: "help <command>",
    allowedPermissions: [],
    notAllowedPermissions: [],
    dbSensitive: false,
    execute: async (channel, tags, message, client, lowerMessage, userTags, db, args) => {
        if (args.length < 1) return await client.say(channel, `Specify command name, e.g. ${db.config.prefix}help ping`);
        
        let command = args[0].toLowerCase();

        for (commandName of Object.keys(client.commands)) {
            let tempCmd = client.commands[commandName];

            if (tempCmd.aliases.includes(command)) {
                return await client.say(channel, `Command: ${tempCmd.name}, aliases: ${tempCmd.aliases.join(", ")}, usage ${db.config.prefix}${(typeof tempCmd.usage == "string") ? tempCmd.usage : tempCmd.usage.join(", "+db.config.prefix)}  - ${tempCmd.description[db.config.language]}`)
            }
        }

        return await client.say(channel, `Command not found.`);
    }
}