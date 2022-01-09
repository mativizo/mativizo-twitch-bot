module.exports = {
    name: "lurk",
    description: { pl: `🤖 wyświetla informację o lurku danego użytkownika.`, en: `🤖 shows info about user going to lurk.` },
    aliases: ["lurk"],
    usage: "lurk",
    allowedPermissions: [],
    notAllowedPermissions: [],
    dbSensitive: false,
    execute: async (channel, tags, message, client, lowerMessage, userTags, db, args) => {
        if (db.config.language == "en") {
            return client.say(channel, `Thank you for the lurk, ${userTags.prettyName}! <3`);
        } else if (db.config.language == "pl") {
            return client.say(channel, `Dziekuję za lurka, ${userTags.prettyName}! <3`);
        }
    }
}