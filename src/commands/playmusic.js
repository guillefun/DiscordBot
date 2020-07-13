const ytdl = require("ytdl-core");
const ytpl = require("ytpl");
module.exports.run = async (client, message, args) => {
  const msg_args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) {
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  }
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

  const serverQueue = client.queue.get(message.guild.id);

  if (ytpl.validateURL(args[0])) {
    var playlistID;
    await ytpl.getPlaylistID(args[0], function (err, id) {
      playlistID = id;
    });
    const playlist = await ytpl(playlistID);
    if (!serverQueue) {
      // Creating the contract for our queue
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true,
      };
      client.queue.set(message.guild.id, queueContruct);
      playlist.items.forEach((song) => {
        queueContruct.songs.push(song);
      });
      try {
        if (playlist) {
          var connection = await voiceChannel.join();
          queueContruct.connection = connection;

          play(message.guild, queueContruct.songs[0]);
        }
      } catch (err) {
        client.queue.delete(message.guild.id);
        return message.channel.send(err);
      }
    } else {
      if (playlist) {
        var sizequeue = serverQueue.songs.length;
        playlist.items.forEach((song) => {
          serverQueue.songs.push(song);
        });
        var finalsize = serverQueue.songs.length;
        return message.channel.send(
          `${finalsize - sizequeue} songs added to the queue!`
        );
      }
    }
  } else {
    const songInfo = await ytdl.getInfo(args[0]);
    const song = {
      title: songInfo.title,
      url: songInfo.video_url,
    };

    if (!serverQueue) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true,
      };
      client.queue.set(message.guild.id, queueContruct);
      queueContruct.songs.push(song);

      try {
        var connection = await voiceChannel.join();
        queueContruct.connection = connection;
        play(message.guild, queueContruct.songs[0]);
      } catch (err) {
        client.queue.delete(message.guild.id);
        return message.channel.send(err);
      }
    } else {
      serverQueue.songs.push(song);
      return message.channel.send(`${song.title} has been added to the queue!`);
    }
  }

  function play(guild, song) {
    const serverQueue = client.queue.get(guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      client.queue.delete(guild.id);
      return;
    }

    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", (error) => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
  }
};
module.exports.help = {
  name: "play",
  description: "play a song",
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
