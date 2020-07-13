const Gfycat = require("gfycat-sdk");
const { client_id, client_secret } = require("../../config.js");

module.exports.run = async (client, message, args) => {
  var gfycat = new Gfycat({
    clientId: client_id,
    clientSecret: client_secret,
  });

  gfycat.authenticate((err, data) => {});
  var i;
  var text = "";
  for (i = 0; i < args.length; i++) {
    text += args[parseInt(i)] + " ";
  }
  message.channel.send(`Searching gif of ${text}`);
  let options = {
    search_text: args[0],
    count: 20,
    first: 30,
  };
  var gifs;
  gfycat.search(options).then((data) => {
    if (data.gfycats.length === 0) {
      message.channel.send(`There are no gifs for ${text}`);
    } else {
      var index = Math.floor(Math.random() * data.gfycats.length);
      while (!data.gfycats[parseInt(index)].gifUrl) {
        index = Math.floor(Math.random() * data.gfycats.length);
      }
      message.channel.send(`${data.gfycats[parseInt(index)].gifUrl}`);
    }
  });
};
module.exports.help = {
  name: "gif",
  description: "See wholesome gifs",
};

module.exports.requirements = {
  userPerms: [],
  clientPerms: [],
  ownerOnly: false,
};

module.exports.limits = {
  rateLimit: 15,
  cooldown: 10000,
};
