// Utils
const fs = require('fs');

// Save DB object to json file
const savedb = (db, name = 'db') => {
    let data = JSON.stringify(db);
    fs.writeFileSync(`./${name}.json`, data);
}

// Load object (DB) from json file
const loaddb = (name = 'db') => {
    let rawdata = fs.readFileSync(`./${name}.json`, 'utf-8');
    let db = JSON.parse(rawdata)
    return db;
}

// Extract command and args from message
const getCmdAndArgs = (message, prefix) => {
    let args = message.trim().split(" ");
    let cmdSplit = args.shift();
    cmdSplit = cmdSplit.split(prefix);
    cmdSplit.shift();
    let cmd = cmdSplit.join(prefix)


    return { cmd, args }
}

// Get random item from array
const getRandomItem = (arr) => {
    if (arr.length == 1) return arr[0];
    return arr[Math.floor(Math.random() * arr.length)]
}

// Get custom roles
const getCustomRoles = (username, db) => {
    username = username.toLowerCase();
    let roles = []
    for (const role of Object.keys(db.roles)) {
        if (db.roles[role].users.includes(username)) {
            roles.push(role)
        }
    }
    return roles;
}

// Extract user tags
const getUserTags = (tags, db) => {
    let customRoles = getCustomRoles(tags.username, db);
    
    return {
        color: tags.color,
        isTurbo: tags.turbo,
        isSub: tags.subscriber,
        isStreamer: (Object.keys(tags.badges).includes('broadcaster')) ? tags.badges.broadcaster == "1" : false,
        isMod: (Object.keys(tags.badges).includes('moderator')) ? tags.badges.moderator == "1" : false,
        isVip: (Object.keys(tags.badges).includes('vip')) ? tags.badges.vip == "1" : false,
        isRegular: customRoles.includes("regular"),
        isSuperModerator: customRoles.includes('supermoderator'),
        customRoles: customRoles,
        prettyName: tags['display-name'],
        userId: tags['user-id']
    }
}

const checkPermissions = (userTags, command, db) => {
    let ap = command.allowedPermissions;
    let nap = command.notAllowedPermissions;
    
    let userAllowed = false;
    let userNotAllowed = true;
    
    // If user is allowed:
    if (ap.length == 0) {
        userAllowed = true;
    } else if (ap[0] == "all") {
        userAllowed = true;
    } else {
        for (a of ap) {
            if (a == "streamer" && userTags.isStreamer) userAllowed = true;
            if (a == "supermoderator" && userTags.customRoles.includes("supermoderator")) userAllowed = true;
            if (a == "moderator" && userTags.isMod) userAllowed = true;
            if (a == "subscriber" && userTags.isSub) userAllowed = true;
            if (a == "vip" && userTags.isVip) userAllowed = true;
            if (a == "regular" && userTags.customRoles.includes("regular")) userAllowed = true;
        }
    }

    // If user is not allowed:
    if (nap.length == 0) {
        userNotAllowed = false
    } else if (nap[0] == "all") {
        userNotAllowed = true
    } else {
        for (na of nap) {
            if (a == "streamer" && userTags.isStreamer) userNotAllowed = true;
            if (a == "supermoderator" && userTags.customRoles.includes("supermoderator")) userNotAllowed = true;
            if (a == "moderator" && userTags.isMod) userNotAllowed = true;
            if (a == "subscriber" && userTags.isSub) userNotAllowed = true;
            if (a == "vip" && userTags.isVip) userNotAllowed = true;
            if (a == "regular" && userTags.customRoles.includes("regular")) userNotAllowed = true;
        }
    }

    // Custom permissions
    if (Object.keys(db.commandOverrides).includes(command.name)) {
        if (Object.keys(db.commandOverrides[command.name]).includes("allowedPermissions")) {
            let roles = db.commandOverrides[command.name].allowedPermissions;
            userAllowed = false;
            if (roles.length == 0) {
                userAllowed = true;
            } else {
                for (const role of roles) {
                    if (userTags.customRoles.includes(role)) {
                        userAllowed = true;
                    }

                    if (role == "streamer" && userTags.isStreamer) userAllowed = true;
                    if (role == "supermoderator" && userTags.customRoles.includes("supermoderator")) userAllowed = true;
                    if (role == "moderator" && userTags.isMod) userAllowed = true;
                    if (role == "subscriber" && userTags.isSub) userAllowed = true;
                    if (role == "vip" && userTags.isVip) userAllowed = true;
                    if (role == "regular" && userTags.customRoles.includes("regular")) userAllowed = true;
                }
            }

            
        }

        if (Object.keys(db.commandOverrides[command.name]).includes("notAllowedPermissions")) {
            let roles = db.commandOverrides[command.name].notAllowedPermissions;
            userNotAllowed = false;
            if (roles.length == 0) {
                userNotAllowed = true;
            } else {
                for (const role of roles) {
                    if (userTags.customRoles.includes(role)) {
                        userNotAllowed = true;
                    }

                    if (role == "streamer" && userTags.isStreamer) userNotAllowed = true;
                    if (role == "supermoderator" && userTags.customRoles.includes("supermoderator")) userNotAllowed = true;
                    if (role == "moderator" && userTags.isMod) userNotAllowed = true;
                    if (role == "subscriber" && userTags.isSub) userNotAllowed = true;
                    if (role == "vip" && userTags.isVip) userNotAllowed = true;
                    if (role == "regular" && userTags.customRoles.includes("regular")) userNotAllowed = true;
                }
            }
        }
    }
    
    return (userAllowed && !userNotAllowed);
}


module.exports = {
    savedb,
    loaddb,
    getCmdAndArgs,
    getRandomItem,
    getUserTags,
    checkPermissions
}