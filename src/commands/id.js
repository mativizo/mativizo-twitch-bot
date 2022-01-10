module.exports = {
    name: "id",
    description: { pl: `🤖 wyświetla id użytkownika.`, en: `🤖 shows user id.` },
    aliases: ["id"],
    usage: ["id", "id <user>"],
    allowedPermissions: ["streamer", "supermoderator"],
    notAllowedPermissions: [],
    dbSensitive: false,
    execute: async (channel, tags, message, client, lowerMessage, userTags, db, args) => {
        return await client.say(channel, `ID: ${userTags.userId}`)
    }
}