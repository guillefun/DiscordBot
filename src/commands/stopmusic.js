const ytdl = require("ytdl-core");

module.exports.run = async (client, message, args) => {
  const serverQueue = client.queue.get(message.guild.id);
  if (!message.member.voice.channel) {
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  }
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
};
module.exports.help = {
  name: "stop",
  description: "Clear music queue",
};

module.exports.requirements = {
  userPerms: ["MANAGE_ACCESS"],
  clientPerms: [],
  ownerOnly: false,
};

module.exports.limits = {
  rateLimit: 20,
  cooldown: 1e4,
};
