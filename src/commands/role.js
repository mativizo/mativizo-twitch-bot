const nameToId = (name) => {
    const regex = /[^A-Za-z0-9]/g;

    name = name.replace(" ", "-")
    name = name.replace(regex, "");
    
    return name.toLowerCase();
}

module.exports = {
    name: "role",
    description: { pl: `🤖 ustawienia ról.`, en: `🤖 roles settings.` },
    aliases: ["role", "rola", "roles"],
    usage: ["role create <rolename>"],
    allowedPermissions: ["streamer", "supermoderator"],
    notAllowedPermissions: [],
    dbSensitive: true,
    execute: async (channel, tags, message, client, lowerMessage, userTags, db, args) => {
        if (args.length < 1) return;

        let subcommand = args.shift().toLowerCase();

        if (subcommand == "create") {
            if (args.length == 0) return await client.say(channel, `You need to specify new role name, e.g. ${db.config.prefix}role create Boss.`);
            
            let name = args.join(" ")
            let id = nameToId(name);
            if (!Object.keys(db.roles).includes(id)) {
                db.roles[id] = {
                    id: id,
                    prettyName: name,
                    users: []
                };

                await client.say(channel, `Role "${name} (id: ${id}) added successfully!"`);
            } else {
                return await client.say(channel, `Role with ID: "${id}" already exists!`);
            }
        } else if (subcommand == "remove") {
            if (args.length == 0) return await client.say(channel, `You need to specify role ID, e.g. ${db.config.prefix}role remove boss.`);

            let id = args.join("-")

            if (Object.keys(db.roles).includes(id)) {
                let removedRole = db.roles[id]
                if (removedRole.canRemove) {
                    delete db.roles[id]
                    await client.say(channel, `Successfully removed role "${removedRole.prettyName} (id: ${removedRole.id})!`);
                } else {
                    return await client.say(channel, `Removing this role is prohibited!`)
                }
                
            } else {
                return await client.say(channel, `Role with ID: "${id}" doesn't exist!`);
            }
        } else if (subcommand == "grant") {
            if (args.length < 2) return await client.say(channel, `You need to specify user and role ID, e.g. ${db.config.prefix}role grant mativizo supermoderator.`);

            let roleId = args[0]
            let username = args[1].toLowerCase();
            username = (username.startsWith("@")) ? username.substring(1) : username;
            
            if (Object.keys(db.roles).includes(roleId)) {
                if (db.roles[roleId].users.includes(username)) {
                    return await client.say(channel, `User already has this role.`)
                } else {
                    db.roles[roleId].users.push(username);
                    await client.say(channel, `Success! Role granted! ${username} is now a ${db.roles[roleId].prettyName}`);
                }
            } else {
                return await client.say(channel, `Role with ID: ${roleId} doesn't exist.`);
            }

        } else if (subcommand == "takeaway") {
            if (args.length < 2) return await client.say(channel, `You need to specify user and role ID, e.g. ${db.config.prefix}role grant mativizo supermoderator.`);

            let roleId = args[0];
            let username = args[1].toLowerCase();
            username = (username.startsWith("@")) ? username.substring(1) : username;

            if (Object.keys(db.roles).includes(roleId)) {
                if (db.roles[roleId].users.includes(username)) {
                    db.roles[roleId].users = db.roles[roleId].users.filter((a) => a != username);
                    await client.say(channel, `Success! The role was taken from ${username}!`)
                } else {
                    return await client.say(channel, `The user doesn't have this role.`);
                }
            } else {
                return await client.say(channel, `Role with ID: ${roleId} doesn't exist.`);
            }

        } else if (subcommand == "list") {
            if (args.length == 0) {
                let roleIds = Object.keys(db.roles);
                let roles = [];
                for (const roleId of roleIds) {
                    roles.push(`${db.roles[roleId].prettyName} [ID: ${roleId}] (${db.roles[roleId].users.length} user(s))`)
                }
                return await client.say(channel, `Custom roles: ${roles.join(" | ")}.`)
            } else {
 
                let roleId = args.join("-");
                
                if (Object.keys(db.roles).includes(roleId)) {
                    let users = []
                    let role = db.roles[roleId]
                    for (const user of role.users) {
                        users.push(user);
                    }

                    return await client.say(channel, `Role ${role.prettyName} users (${role.users.length}): ${users.join(" | ")}`)
                } else {
                    return await client.say(channel, `Role with ID: ${roleId} doesn't exist.`);
                }

            }
        }

        return db;
    }
}