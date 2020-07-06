const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message,args)=>{
    const cmd = client.commands.get(args[0]);
    if(args[0]){
        switch(cmd){
            case undefined:
                message.reply("That command does not exist, type <- **$help** -> to see the existing commands")
                break;
            default:
                const embed = new MessageEmbed()
                    .setAuthor(`Help | ${cmd.help.name} `, client.user.displayAvatarURL())
                    .setColor(0x123456)
                    .setDescription(`**Name:** ${cmd.help.name}\n**Description:** ${cmd.help.description}`);
                return message.channel.send(embed);
        }
        
    }else{
        const embed = new MessageEmbed()
            .setAuthor(`Help | ${client.user.username}`, client.user.displayAvatarURL())
            .setColor(0x000000)
            .setDescription('**Commands**: '+client.commands.map(cmd=>cmd.help.name)
                                        .join(", ")
                                        );
    message.channel.send(embed);
    }
}


module.exports.help = {
    name: "help",
    description: "just help."
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}

module.exports.limits = {
    rateLimit: 50,
    cooldown: 1e4
}