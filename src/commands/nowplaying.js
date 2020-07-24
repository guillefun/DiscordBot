const ytdl = require("ytdl-core");

module.exports.run = async (client, message, args) => {
  const serverQueue = client.queue.get(message.guild.id);
  if (!serverQueue) {
    return message.channel.send("There is nothing playing.");
  }
  return message.channel.send(`Now playing: ${serverQueue.songs[0].title}`);
};
module.exports.help = {
  name: "playing",
  description: "Get the name of the song you're listening to",
};

module.exports.requirements = {
  userPerms: [],
  clientPerms: [],
  ownerOnly: false,
};

module.exports.limits = {
  rateLimit: 20,
  cooldown: 60000,
};
