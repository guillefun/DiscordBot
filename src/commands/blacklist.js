module.exports.run = async (client, message, args) =>{
    const user = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => null);
    if(!user) return message.reply("you must provide a username");

    if(blacklist.includes(user.id)){
        client.blacklist.splice(client.blacklist.indexOf(user.id));
        message.reply(`successfully removed **${user.tag}** from the blacklist!`);
    }else{
        client.blacklist.push(user.id);
        message.reply(`sucessfully added **${user.tag}** to the **blacklist**`);
    }

    await client.db.set("blacklist", client.blacklist);
}

module.exports.help = {
    name: "blacklist",
    description: "BAN."
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: true
}

module.exports.limits = {
    rateLimit: 99,
    cooldown: 6e4
}