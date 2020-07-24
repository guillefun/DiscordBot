var request = require("request");
module.exports.run = async (client, message, args) => {
  var mcIP = "0.0.0.0"; // Your MC server IP or hostname address
  var mcPort = 25565; // Your MC server port (25565 is the default)

  var url = "http://mcapi.us/server/status?ip=" + mcIP + "&port=" + mcPort;

  function getStatus() {
    return new Promise((resolve, reject) => {
      request(url, function (err, response, body) {
        var status;
        if (err) {
          reject(new Error("API error"));
        } else {
          body = JSON.parse(body);
          if (body.online) {
            status =
              "There are " +
              (body.players.now || "0") +
              " of " +
              body.players.max +
              " in " +
              body.motd;
          } else {
            status = "Server offline";
          }
          resolve(status);
        }
      });
    });
  }

  await message.reply(await getStatus());
};
module.exports.help = {
  name: "Xmcserver",
  description: "See your Minecraft server status",
};

module.exports.requirements = {
  userPerms: [],
  clientPerms: [],
  ownerOnly: false,
};

module.exports.limits = {
  rateLimit: 5,
  cooldown: 60000,
};
