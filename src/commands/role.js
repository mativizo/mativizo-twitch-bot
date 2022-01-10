module.exports = {
    name: "role",
    description: { pl: `🤖 ustawienia ról.`, en: `🤖 roles settings.` },
    aliases: ["role", "rola", "roles"],
    usage: ["role create <rolename>"],
    allowedPermissions: ["streamer", "supermoderator"],
    notAllowedPermissions: [],
    dbSensitive: true,
    execute: async (channel, tags, message, client, lowerMessage, userTags, db, args) => {
        return db;
    }
}