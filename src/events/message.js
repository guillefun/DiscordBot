const { owners } = require("../../config");

module.exports = async (client, message) => {
    if (!message.guild || message.author.bot) return;

    if(!client.prefix[message.guild.id]){
        client.prefix[message.guild.id] = await client.db.get(`prefix-${message.guild.id}`, client.prefix["default"]);
    }
    const args = message.content.split(/ +/g);
    const command = args.shift().slice(client.prefix[message.guild.id].length).toLowerCase();
    const cmd = client.commands.get(command);

    if(!message.content.toLowerCase().startsWith(client.prefix[message.guild.id])) return;

    if(!cmd) return;
    if(!message.channel.permissionsFor(message.guild.me).toArray().includes("SEND_MESSAGES")) return;

    if(cmd.requirements.ownerOnly && !owners.includes(message.author.id))
        return message.reply("only the bot owner can use this command!");

    if(cmd.requirements.userPerms && !message.member.permissions.has(cmd.requirements.userPerms))
        return message.reply(`you need the following permissions: ${miss_perms(message.member, cmd.requirements.userPerms)}`);

    if(cmd.requirements.clientPerms && !message.guild.me.permissions.has(cmd.requirements.clientPerms))
        return message.reply(`I am missing the following permissions: ${miss_perms(message.guild.me, cmd.requirements.clientPerms)}`);

    if(cmd.limits){
        const current = client.limits.get(`${command}-${message.author.id}`);
        if (!current)  
            client.limits.set(`${command}-${message.author.id}`, 1);
        else {
           if (current >= cmd.limits.rateLimit) return; 
           client.limits.set(`${command}-${message.author.id}`, current + 1);
        }

        setTimeout(() => {
            client.limits.delete(`${command}-${message.author.id}`);
        }, cmd.limits.cooldown);
    }

    cmd.run(client, message, args);

}

const miss_perms = (member, perms) => {
    const  mperms = member.permission.missing(perms)
                    .map(s => `\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``);
    return mperms.length > 1 ?
        `${mperms.slice(0,-1).join(", ")} and ${mperms.slice(-1)[0]}` :
        mperms[0];
}