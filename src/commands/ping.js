module.exports.run = (client, message, args) =>{
    message.reply(`BOOF! ${client.ws.ping.toFixed(2)}ms`);
}

module.exports.help = {
    name: "ping",
    description: "just ping."
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}