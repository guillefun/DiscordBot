const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  const cmd = client.commands.get(args[0]);
  if (args[0]) {
    switch (cmd) {
      case undefined:
        message.reply(
          "That command does not exist, type <- **$help** -> to see the existing commands"
        );
        break;
      default:
        const embed = new MessageEmbed()
          .setAuthor(`Help | ${cmd.help.name} `, client.user.displayAvatarURL())
          .setColor("#F37748")
          .setDescription(
            `**Name:** ${cmd.help.name}\n**Description:** ${cmd.help.description}`
          );
        return message.channel.send(embed);
    }
  } else {
    /*
        const embed = new MessageEmbed()
            .setAuthor(`Help | ${client.user.username}`, client.user.displayAvatarURL())
            .setColor(0x000000)
            .setDescription('**Commands**: '+client.commands.map(cmd=>cmd.help.name)
                                        .join(", ")
                                        );*/
    var prefix = client.prefix[message.guild.id];
    if (!prefix) {
      client.prefix["default"];
    }
    const embed = new MessageEmbed()
      .setColor("#F37748")
      .setTitle("Bot Commands")
      .setAuthor(
        client.user.username,
        client.user.displayAvatarURL(),
        "https://github.com/guillefun/DiscordBot"
      )
      .setDescription("These are the Bot Commands")
      .setThumbnail(client.user.displayAvatarURL())
      .addFields(
        {
          name: "Music Commands",
          value:
            `${prefix}play <url>: Play music from a youtube video or playlist\n` +
            `${prefix}stop: Delete the song queue\n` +
            `${prefix}skip: Skip the current song\n`,
        },
        {
          name: "Rank Commands",
          value:
            `${prefix}rank: Check your rank\n` +
            `${prefix}banner <url.png/jpg>: Add a custom background to your banner\n`,
        },
        {
          name: "Miscellaneous Commands",
          value:
            `${prefix}mcserver : Check the status of your minecraft server!\n` +
            `${prefix}gif <string> : Get a random gif related with a word given!\n`,
        }
      )
      //.addField("Inline field title", "Some value here", true)
      .setImage(client.user.displayAvatarURL())
      .setTimestamp();

    message.channel.send(embed);
  }
};

module.exports.help = {
  name: "help",
  description: "just help.",
};

module.exports.requirements = {
  userPerms: [],
  clientPerms: [],
  ownerOnly: false,
};

module.exports.limits = {
  rateLimit: 50,
  cooldown: 60000,
};
