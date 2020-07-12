const ytdl = require("ytdl-core");

module.exports.run = async (client, message, args) => {
  const serverQueue = client.queue.get(message.guild.id);
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  if (!serverQueue)
    return message.channel.send("There is no song that I could skip!");
  serverQueue.connection.dispatcher.end();
};
module.exports.help = {
  name: "skip",
  description: "skip a song",
};

module.exports.requirements = {
  userPerms: [],
  clientPerms: [],
  ownerOnly: false,
};

module.exports.limits = {
  rateLimit: 25,
  cooldown: 1e4,
};
