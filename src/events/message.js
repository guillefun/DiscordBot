const { owners } = require("../../config");

module.exports = (client, message) => {
    if (message.author.bot) return;

    const args = message.content.split(/ +/g);
    const command = args.shift().slice(client.prefix.length).toLowerCase();
    const cmd = client.commands.get(command);

    if(!message.content.toLowerCase().startsWith(client.prefix)) return;

    if(!cmd) return;
    if(!message.guild.me.permissions.has(["SEND_MESSAGES"])) return;

    if(cmd.requirements.ownerOnly && !owners.includes(message.author.id))
        return message.reply("only the bot owner can use this command!");

    if(cmd.requirements.userPerms && !message.member.permissions.has(cmd.requirements.userPerms))
        return message.reply(`you need the following permissions: ${miss_perms(message.member, cmd.requirements.userPerms)}`);

    if(cmd.requirements.clientPerms && !message.guild.me.permissions.has(cmd.requirements.clientPerms))
        return message.reply(`I am missing the following permissions: ${miss_perms(message.guild.me, cmd.requirements.clientPerms)}`);

    cmd.run(client, message, args);

}

const miss_perms = (member, perms) => {
    const  mperms = member.permission.missing(perms)
                    .map(s => `\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``);
    return mperms.length > 1 ?
        `${mperms.slice(0,-1).join(", ")} and ${mperms.slice(-1)[0]}` :
        mperms[0];
}