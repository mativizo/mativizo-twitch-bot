// Utils
const fs = require('fs');

// Save DB object to json file
const savedb = (db, name = 'db') => {
    let data = JSON.stringify(db);
    fs.writeFileSync(`./${name}`, data);
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
    let cmd = args.shift();
    cmd = cmd.split(prefix)[1]

    return { cmd, args }
}

// Get random item from array
const getRandomItem = (arr) => {
    if (arr.length == 1) return arr[0];
    return arr[Math.floor(Math.random() * arr.length)]
}

// Extract user tags
const getUserTags = (tags) => {
    return {
        color: tags.color,
        isTurbo: tags.turbo,
        isSub: tags.subscriber,
        isStreamer: (Object.keys(tags.badges).includes('broadcaster')) ? tags.badges.broadcaster == "1" : false,
        isMod: (Object.keys(tags.badges).includes('moderator')) ? tags.badges.moderator == "1" : false,
        isVip: (Object.keys(tags.badges).includes('vip')) ? tags.badges.vip == "1" : false,
        prettyName: tags['display-name'],
        userId: tags['user-id']
    }
}


module.exports = {
    savedb,
    loaddb,
    getCmdAndArgs,
    getRandomItem,
    getUserTags
}