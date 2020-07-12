const { readdirSync } = require("fs");
const { join } = require("path");
const file_path = join(__dirname, "..", "commands");

module.exports.run = (client) => {
  for (const cmd of readdirSync(file_path)
    .filter((cmd) => cmd.endsWith(".js"))
    .filter((cmd) => !cmd.endsWith("example.js"))) {
    const prop = require(`${file_path}/${cmd}`);
    client.commands.set(prop.help.name, prop);
  }

  console.log(`${client.commands.size} commands loaded :)`);
};
