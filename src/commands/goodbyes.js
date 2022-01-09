module.exports = {
    name: "goodbyes",
    description: { pl: `🤖 ustawienia pożegnań. 👋`, en: `🤖 goodbyes settings. 👋` },
    aliases: ["goodbyes", "pożegnania", "pozegnania"],
    usage: ["goodbyes list <type>", "goodbyes add <type> <value>", "goodbyes remove <type> <id>"],
    allowedPermissions: ["streamer"],
    notAllowedPermissions: [],
    dbSensitive: true,
    execute: async (channel, tags, message, client, lowerMessage, userTags, db, args) => {
        if (args.length < 1) return;

        let subcommand = args.shift();

        if (subcommand == "add") {
            if (args < 2) await client.say(channel, `${db.config.prefix}goodbyes add command need min. two arguments (goodbyes add trigger <trigger> or goodbyes add response <response>).`)

            let triggerOrResponse = args.shift()
            triggerOrResponse = triggerOrResponse.toLowerCase();

            if (triggerOrResponse == "trigger") {
                let newTrigger = args.join(" ")
                if (newTrigger.length < 2) await client.say(channel, `New trigger needs to be atleast 2 chars long.`)
                db.goodbyes.triggers.push(newTrigger.toLowerCase())
                await client.say(channel, `goodbyes trigger "${newTrigger}" added successfully!`)
            } else if (triggerOrResponse == "response") {
                let newResponse = args.join(" ")
                if (newResponse.length < 1) await client.say(channel, `New response can't be empty.`)
                db.goodbyes.responses.push(newResponse)
                await client.say(channel, `goodbyes response "${newResponse}" added successfully!`)
            } else {
                await client.say(channel, `Wrong usage, try to specify type by "trigger" or "reponse".`)
            }
        } else if (subcommand == "list") {
            if (args < 1) await client.say(channel, `You need to specify, what you want to see (triggers or responses).`)

                let triggersOrResponses = args[0].toLowerCase()

                if (triggersOrResponses == "triggers") {
                    let triggers = ""
                    for (let i = 1; i <= db.goodbyes.triggers.length; i++) {
                        if (i != 1) triggers += " | "
                        triggers += `${i}. "${db.goodbyes.triggers[i-1]}"`
                    }
                    await client.say(channel, `goodbyes triggers: ${triggers} - To remove trigger use !goodbyes remove trigger <id>`)
                } else if (triggersOrResponses == "responses") {
                    let responses = ""
                    for (let i = 1; i <= db.goodbyes.responses.length; i++) {
                        if (i != 1) triggers += " | "
                        responses += `${i}. "${db.goodbyes.responses[i-1]}"`
                    }
                    await client.say(channel, `goodbyes responses: ${triggers} - To remove trigger use !goodbyes remove response <id>`)
                } else {
                    await client.say(channel, `Wrong usage, try to specify type by "trigger" or "reponse".`)
                }
            } else if (subcommand == "list") {
                if (args < 1) {
                    await client.say(channel, `You need to specify, what you want to see (triggers or responses).`)
                }

                let triggersOrResponses = args[0].toLowerCase()

                if (triggersOrResponses == "triggers") {
                    let triggers = ""
                    for (let i = 1; i <= db.goodbyes.triggers.length; i++) {
                        if (i != 1) triggers += " | "
                        triggers += `${i}. "${db.goodbyes.triggers[i-1]}"`
                    }
                    await client.say(channel, `goodbyes triggers: ${triggers} - To remove trigger use !goodbyes remove trigger <id>`)
                } else if (triggersOrResponses == "responses") {
                    let responses = ""
                    for (let i = 1; i <= db.goodbyes.responses.length; i++) {
                        if (i != 1) triggers += " | "
                        responses += `${i}. "${db.goodbyes.responses[i-1]}"`
                    }
                    await client.say(channel, `goodbyes responses: ${triggers} - To remove trigger use !goodbyes remove response <id>`)
                } else {
                    await client.say(channel, `Wrong usage, try to specify type by "trigger" or "reponse".`)
                }
            } else if (subcommand == "remove") {
                if (args < 2) {
                    await client.say(channel, `You need to specify what you want to remove (!goodbyes trigger <id>).`)
                }

                let triggerOrResponse = args[0].toLowerCase()
                let id = parseInt(args[1])

                if (triggerOrResponse == "trigger") {
                if (id < 1 || id > db.goodbyes.triggers.length) await client.say(channel, `Wrong ID. You need to specify ID in range from 1 to ${db.goodbyes.triggers.length}. To see list of triggers type !goodbyes list triggers`)

                let removedTrigger = ""

                db.goodbyes.triggers = db.goodbyes.triggers.filter((v,i) => {
                    if (i == id-1) {
                        removedTrigger = v;
                        return false;
                    }
                    return true
                });
                await client.say(channel, `goodbyes trigger "${removedTrigger}" removed successfully!`)
            } else if (triggerOrResponse == "response") {
                if (id < 1 || id > db.goodbyes.responses.length) {
                    await client.say(channel, `Wrong ID. You need to specify ID in range from 1 to ${db.goodbyes.responses.length}. To see list of triggers type !goodbyes list responses`)
                }

                let removedResponse = ""

                db.goodbyes.responses = db.goodbyes.responses.filter((v,i) => {
                    if (i == id-1) {
                        removedResponse = v;
                        return false;
                    }
                    return true
                });
                await client.say(channel, `goodbyes response "${removedTrigger}" removed successfully!`)
            } else {
                await client.say(channel, `Wrong usage, try to specify type by "trigger" or "reponse".`)
            }
        }

        return { db }
    }
}