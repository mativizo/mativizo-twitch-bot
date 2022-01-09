module.exports = {
    name: "greetings",
    description: { pl: `🤖 ustawienia powitań. 👋`, en: `🤖 greetings settings. 👋` },
    aliases: ["greetings", "powitania"],
    usage: ["greetings list <type>", "greetings add <type> <value>", "greetings remove <type> <id>"],
    allowedPermissions: ["streamer"],
    notAllowedPermissions: [],
    dbSensitive: true,
    execute: async (channel, tags, message, client, lowerMessage, userTags, db, args) => {
        if (args.length < 1) return;

        let subcommand = args.shift();

        if (subcommand == "add") {
            if (args < 2) await client.say(channel, `${db.config.prefix}greetings add command need min. two arguments (greetings add trigger <trigger> or greetings add response <response>).`)

            let triggerOrResponse = args.shift()
            triggerOrResponse = triggerOrResponse.toLowerCase();

            if (triggerOrResponse == "trigger") {
                let newTrigger = args.join(" ")
                if (newTrigger.length < 2) await client.say(channel, `New trigger needs to be atleast 2 chars long.`)
                db.greetings.triggers.push(newTrigger.toLowerCase())
                await client.say(channel, `Greetings trigger "${newTrigger}" added successfully!`)
            } else if (triggerOrResponse == "response") {
                let newResponse = args.join(" ")
                if (newResponse.length < 1) await client.say(channel, `New response can't be empty.`)
                db.greetings.responses.push(newResponse)
                await client.say(channel, `Greetings response "${newResponse}" added successfully!`)
            } else {
                await client.say(channel, `Wrong usage, try to specify type by "trigger" or "reponse".`)
            }
        } else if (subcommand == "list") {
            if (args < 1) await client.say(channel, `You need to specify, what you want to see (triggers or responses).`)

                let triggersOrResponses = args[0].toLowerCase()

                if (triggersOrResponses == "triggers") {
                    let triggers = ""
                    for (let i = 1; i <= db.greetings.triggers.length; i++) {
                        if (i != 1) triggers += " | "
                        triggers += `${i}. "${db.greetings.triggers[i-1]}"`
                    }
                    await client.say(channel, `Greetings triggers: ${triggers} - To remove trigger use !greetings remove trigger <id>`)
                } else if (triggersOrResponses == "responses") {
                    let responses = ""
                    for (let i = 1; i <= db.greetings.responses.length; i++) {
                        if (i != 1) triggers += " | "
                        responses += `${i}. "${db.greetings.responses[i-1]}"`
                    }
                    await client.say(channel, `Greetings responses: ${triggers} - To remove trigger use !greetings remove response <id>`)
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
                    for (let i = 1; i <= db.greetings.triggers.length; i++) {
                        if (i != 1) triggers += " | "
                        triggers += `${i}. "${db.greetings.triggers[i-1]}"`
                    }
                    await client.say(channel, `Greetings triggers: ${triggers} - To remove trigger use !greetings remove trigger <id>`)
                } else if (triggersOrResponses == "responses") {
                    let responses = ""
                    for (let i = 1; i <= db.greetings.responses.length; i++) {
                        if (i != 1) triggers += " | "
                        responses += `${i}. "${db.greetings.responses[i-1]}"`
                    }
                    await client.say(channel, `Greetings responses: ${triggers} - To remove trigger use !greetings remove response <id>`)
                } else {
                    await client.say(channel, `Wrong usage, try to specify type by "trigger" or "reponse".`)
                }
            } else if (subcommand == "remove") {
                if (args < 2) {
                    await client.say(channel, `You need to specify what you want to remove (!greetings trigger <id>).`)
                }

                let triggerOrResponse = args[0].toLowerCase()
                let id = parseInt(args[1])

                if (triggerOrResponse == "trigger") {
                if (id < 1 || id > db.greetings.triggers.length) await client.say(channel, `Wrong ID. You need to specify ID in range from 1 to ${db.greetings.triggers.length}. To see list of triggers type !greetings list triggers`)

                let removedTrigger = ""

                db.greetings.triggers = db.greetings.triggers.filter((v,i) => {
                    if (i == id-1) {
                        removedTrigger = v;
                        return false;
                    }
                    return true
                });
                await client.say(channel, `Greetings trigger "${removedTrigger}" removed successfully!`)
            } else if (triggerOrResponse == "response") {
                if (id < 1 || id > db.greetings.responses.length) {
                    await client.say(channel, `Wrong ID. You need to specify ID in range from 1 to ${db.greetings.responses.length}. To see list of triggers type !greetings list responses`)
                }

                let removedResponse = ""

                db.greetings.responses = db.greetings.responses.filter((v,i) => {
                    if (i == id-1) {
                        removedResponse = v;
                        return false;
                    }
                    return true
                });
                await client.say(channel, `Greetings response "${removedTrigger}" removed successfully!`)
            } else {
                await client.say(channel, `Wrong usage, try to specify type by "trigger" or "reponse".`)
            }
        }

        return { db }
    }
}