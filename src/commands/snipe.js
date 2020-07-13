const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  const msg = client.snipes.get(message.channel.id);
  if (!msg) {
    return message.reply("no recently deleted messages");
  }

  const embed = new MessageEmbed()
    .setAuthor(`Deleted by ${msg.author.tag}`, msg.author.displayAvatarURL())
    .setDescription(msg.content);

  if (msg.image) {
    embed.setImage(msg.image);
  }

  message.channel.send(embed);
};

module.exports.help = {
  name: "snipe",
  description: "Last deleted message",
};

module.exports.requirements = {
  userPerms: ["MANAGE_MESSAGES"],
  clientPerms: [],
  ownerOnly: false,
};

module.exports.limits = {
  rateLimit: 5,
  cooldown: 60000,
};
