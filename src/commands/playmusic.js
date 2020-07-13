const ytdl = require("ytdl-core");
const ytpl = require("ytpl");
const { MessageEmbed } = require("discord.js");
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
  const queueContruct = {
    textChannel: message.channel,
    voiceChannel: voiceChannel,
    connection: null,
    songs: [],
    volume: 5,
    playing: true,
  };

  if (ytpl.validateURL(args[0])) {
    var playlistID;
    await ytpl.getPlaylistID(args[0], function (err, id) {
      playlistID = id;
    });
    const playlist = await ytpl(playlistID);

    if (!serverQueue) {
      client.queue.set(message.guild.id, queueContruct);
      var counter = 0;
      playlist.items.forEach((song) => {
        queueContruct.songs.push(song);
        if (counter < 15) console.log(song);
        counter++;
      });
      try {
        if (playlist) {
          const connection = await voiceChannel.join();
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
  } else if (ytdl.validateURL(args[0])) {
    const songInfo = await ytdl.getInfo(args[0]);

    const song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
      thumbnail:
        songInfo.videoDetails.thumbnail.thumbnails[
          songInfo.videoDetails.thumbnail.thumbnails.length - 1
        ].url,
    };

    if (!serverQueue) {
      client.queue.set(message.guild.id, queueContruct);
      queueContruct.songs.push(song);

      try {
        const connection = await voiceChannel.join();
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
    if (song.title === "[Private video]" || song.title === "[Deleted video]") {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    } else {
      const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
          serverQueue.songs.shift();
          play(guild, serverQueue.songs[0]);
        })
        .on("error", (error) => {});

      dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

      const embed = new MessageEmbed()
        .setColor("#F37748")
        .setTitle(`:musical_note: Start playing :musical_note:`)
        .setDescription(song.title)
        .setThumbnail(client.user.displayAvatarURL())
        .setImage(song.thumbnail)
        .setTimestamp();

      serverQueue.textChannel.send(embed);
    }
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
  cooldown: 60000,
};
