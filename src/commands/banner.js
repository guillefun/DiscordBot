const {MessageAttachment} = require("discord.js");
const { createCanvas, loadImage } = require("canvas");
const { join } = require("path");

module.exports.run = async (client, message, args) =>{
    
    if(args[0])
        client.db.set(`banner-${message.guild.id}-${message.author.id}`, args[0]);
    
}

module.exports.help = {
    name: "banner",
    description: "Change banner"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}

module.exports.limits = {
    rateLimit: 3,
    cooldown: 6e4
}