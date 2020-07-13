module.exports.run = async (client, message, args) => {
  if (!args[0]) {
    return message.reply("You need to specify a new prefix...");
  }
  const prefix = args[0].toLowerCase();

  await client.db.set(`prefix-${message.guild.id}`, prefix);
  client.prefix[message.guild.id] = prefix;

  return message.reply(`new prefix is: \`${prefix}\``);
};

module.exports.help = {
  name: "setprefix",
  description: "Change prefix of the bot",
};

module.exports.requirements = {
  userPerms: ["MANAGE_GUILD"],
  clientPerms: [],
  ownerOnly: false,
};

module.exports.limits = {
  rateLimit: 2,
  cooldown: 1e4,
};
