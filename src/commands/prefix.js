module.exports = {
    name: "prefix",
    description: { pl: `🤖 zmienia prefix!`, en: `🤖 changes prefix!` },
    aliases: ["prefix"],
    usage: "prefix !",
    allowedPermissions: ["streamer"],
    notAllowedPermissions: [],
    dbSensitive: true,
    execute: async (channel, tags, message, client, lowerMessage, userTags, db, args) => {
        if (args.length < 1) return await client.say(channel, `You need to specify new prefix, like ${db.config.prefix}prefix >`);

        let newPrefix = args[0];
        if (newPrefix.startsWith(".") || newPrefix.startsWith("/")) {
            return await client.say(channel, `Prefix "${newPrefix} is prohibited. Try something else."`)
        }
        db.config.prefix = newPrefix;
        await client.say(channel, `Prefix changed to "${db.config.prefix}".`)

        return { db };
    }
}