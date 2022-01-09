const getCmdAndArgs = (message, prefix) => {
    let args = message.trim().split(" ");
    let cmd = args.shift();
    cmd = cmd.split(prefix)[1]

    return { cmd, args }
}


module.exports = {
    getCmdAndArgs
}