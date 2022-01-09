// Utils

const fs = require('fs');

const savedb = (db, name = 'db') => {
    let data = JSON.stringify(db);
    fs.writeFileSync(`./${name}`, data);
}

const loaddb = (name = 'db') => {
    let rawdata = fs.readFileSync(`./${name}.json`, 'utf-8');
    let db = JSON.parse(rawdata)
    return db;
}


const getCmdAndArgs = (message, prefix) => {
    let args = message.trim().split(" ");
    let cmd = args.shift();
    cmd = cmd.split(prefix)[1]

    return { cmd, args }
}

const getRandomItem = (arr) => {
    if (arr.length == 1) return arr[0];
    return arr[Math.floor(Math.random() * arr.length)]
}


module.exports = {
    savedb,
    loaddb,
    getCmdAndArgs,
    getRandomItem
}