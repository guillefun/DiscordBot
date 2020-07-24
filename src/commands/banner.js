const { MessageAttachment } = require("discord.js");
const { createCanvas, loadImage } = require("canvas");
const { join } = require("path");

module.exports.run = async (client, message, args) => {
  var regex = /[\/.](jpg|jpeg|tiff|png)$/i;
  if (args[0] && regex.test(args[0])) {
    client.db.set(`banner-${message.guild.id}-${message.author.id}`, args[0]);
  } else {
    if (!regex.test(args[0])) {
      message.reply("The file URL is not a valid image");
    }
    if (!args[0]) {
      message.reply("You need to provide an URL");
    }
  }
};

module.exports.help = {
  name: "banner",
  description: "Change the background of your banner",
};

module.exports.requirements = {
  userPerms: [],
  clientPerms: [],
  ownerOnly: false,
};

module.exports.limits = {
  rateLimit: 3,
  cooldown: 60000,
};
