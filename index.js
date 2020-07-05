const { token, prefix } = require("./config");
const { Client, Collection } = require("discord.js");

const client = new Client({
  disableEveryone: true,
  disabledEvents: ["TYPINP_START"],
});

client.prefix = prefix;
client.commands = new Collection();

const commands = require("./src/structures/command");
commands.run(client);

const events = require("./src/structures/event");
events.run(client);

client.login(token);