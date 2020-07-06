const { token, prefix, mongodbcon } = require("./config");
const { Client, Collection } = require("discord.js");
const { VultrexDB } = require("vultrex.db");

const client = new Client({
  disableEveryone: true,
  disabledEvents: ["TYPINP_START"],
});

const db = new VultrexDB({
  url: mongodbcon,
  provider: 'mongodb',
  collection: 'main'
});

db.connect().then(() =>{
  console.log("connectado")
  client.commands = new Collection();
  client.limits = new Map();
  client.snipes = new Map();
  client.prefix = new Object();
  client.prefix["default"] = prefix;
  client.db = db;

  const commands = require("./src/structures/command");
  commands.run(client);

  const events = require("./src/structures/event");
  events.run(client);

  client.login(token);
});

