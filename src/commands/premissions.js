module.exports = {
    name: "permissions",
    description: { pl: `🤖 wyświetla i zmienia uprawniena do komend.`, en: `🤖 shows or changes commands permissions.` },
    aliases: ["permissions", "privileges", "uprawnienia"],
    usage: ["permissions list <command>", "permissions override allowed <command> <roleid1> <roleid2>", "permissions override notallowed <command> <roleid1> <roleid2>", "permissions default allowed <command>", "permissions default notallowed <command>"],
    allowedPermissions: ["streamer", "supermoderator"],
    notAllowedPermissions: [],
    dbSensitive: true,
    execute: async (channel, tags, message, client, lowerMessage, userTags, db, args) => {
        if (args.length < 2) return await client.say(channel, `Not enough arguments, check ${db.config.prefix}help permissions`)

        let subcommand = args.shift().toLowerCase();
        if (subcommand == "list") {
            let commandName = args.shift().toLowerCase();

            let targetCommand = false;

            for(const commandId of Object.keys(client.commands)) {
                if (client.commands[commandId].aliases.includes(commandName)) {
                    targetCommand = client.commands[commandId];
                }
            }

            if (!targetCommand) return await client.say(channel, `Command ${commandName} doesn't exist.`)

            let overridesAllowed = [];
            let overridesNotAllowed = [];
            if (Object.keys(db.commandOverrides).includes(targetCommand.name)) {
                if (Object.keys(db.commandOverrides[targetCommand.name]).includes('allowedPermissions')) {
                    overridesAllowed = db.commandOverrides[targetCommand.name].allowedPermissions
                }

                if (Object.keys(db.commandOverrides[targetCommand.name]).includes('notAllowedPermissions')) {
                    overridesNotAllowed = db.commandOverrides[targetCommand.name].notAllowedPermissions
                }
            }

            return await client.say(
                channel, 
                `Command permissions for ${targetCommand.name}:
                 Default Allowed: ${(targetCommand.allowedPermissions.length == 0) ? "All allowed" : targetCommand.allowedPermissions.join(', ')} | 
                 Default Not Allowed: ${(targetCommand.notAllowedPermissions.length === 0) ? "None" : targetCommand.notAllowedPermissions.join(', ')} | 
                 Allowed (override): ${(overridesAllowed.length == 0) ? "Not Overrided." : overridesAllowed.join(", ")} | 
                 Not Allowed (override): ${(overridesNotAllowed.length == 0) ? "Not Overrided." : overridesNotAllowed.join(", ")}`)
        } else if (subcommand == "default") {
            if (args.length < 2) return await client.say(channel, `Not enough arguments, check ${db.config.prefix}help permissions`)

            let allowOrNotAllow = args.shift().toLowerCase();
            let commandName = args.shift().toLowerCase();
            let targetCommand = false;

            for(const commandId of Object.keys(client.commands)) {
                if (client.commands[commandId].aliases.includes(commandName)) {
                    targetCommand = client.commands[commandId];
                }
            }

            if (!targetCommand) return await client.say(channel, `Command ${commandName} doesn't exist.`)
            
            if (allowOrNotAllow == "allowed") {
                delete db.commandOverrides[targetCommand.name].allowedPermissions;
                await client.say(channel, `Permissions override for command ${targetCommand.name} (allowed) removed (default in use).`)
            } else if (allowOrNotAllow == "notallowed") {
                delete db.commandOverrides[targetCommand.name].notAllowedPermissions;
                await client.say(channel, `Permissions override for command ${targetCommand.name} (notallowed) removed (default in use).`)
            }     
        } else if (subcommand == "override") {
            if (args.length < 3) return await client.say(channel, `Not enough arguments, check ${db.config.prefix}help permissions`)

            let allowOrNotAllow = args.shift().toLowerCase();
            let commandName = args.shift().toLowerCase();

            let targetCommand = false;

            for(const commandId of Object.keys(client.commands)) {
                if (client.commands[commandId].aliases.includes(commandName)) {
                    targetCommand = client.commands[commandId];
                }
            }

            if (!targetCommand) return await client.say(channel, `Command ${commandName} doesn't exist.`)
            
            let roles = [];
            for(const potentialRole of args) {
                if (Object.keys(db.roles).includes(potentialRole)) {
                    roles.push(potentialRole);
                }
            }


            if (allowOrNotAllow == "allowed") {
                if (!Object.keys(db.commandOverrides).includes(targetCommand.name)) db.commandOverrides[targetCommand.name] = {};
                db.commandOverrides[targetCommand.name].allowedPermissions = roles;
                await client.say(channel, `Permissions override for command ${targetCommand.name} for "allowed" changed to: ${(roles.length == 0) ? 'All allowed' : roles.join(", ")}.`)
            } else if (allowOrNotAllow == "notallowed") {
                if (!Object.keys(db.commandOverrides).includes(targetCommand.name)) db.commandOverrides[targetCommand.name] = {};
                db.commandOverrides[targetCommand.name].notAllowedPermissions = roles;
                await client.say(channel, `Permissions override for command ${targetCommand.name} for "notallowed" changed to: ${(roles.length == 0) ? 'All allowed' : roles.join(", ")}.`)
            }     


        }

        return { db }
    }
}