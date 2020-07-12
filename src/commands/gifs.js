const Gfycat = require("gfycat-sdk");
const { client_id, client_secret } = require("../../config.js");

module.exports.run = async (client, message, args) => {
  var gfycat = new Gfycat({
    clientId: client_id,
    clientSecret: client_secret,
  });

  gfycat.authenticate((err, data) => {
    //Your app is now authenticated

    console.log("token", gfycat.token);
  });

  let options = {
    search_text: args[0],
    count: 20,
    first: 30,
  };
  var gifs;
  gfycat.search(options).then((data) => {
    //gifs = data;
    //console.log("gfycats", data);
    console.log(data);
    var index = Math.floor(Math.random() * data.gfycats.length);
    while (!data.gfycats[index].gifUrl) {
      index = Math.floor(Math.random() * data.gfycats.length);
    }
    message.channel.send(`${data.gfycats[index].gifUrl}`);
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
  rateLimit: 5,
  cooldown: 1e4,
};
