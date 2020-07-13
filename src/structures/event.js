const { readdirSync } = require("fs");
const { join } = require("path");
const file_path = join(__dirname, "..", "events");

module.exports.run = (client) => {
  const event_files = readdirSync(file_path);
  for (const event_file of readdirSync(file_path)) {
    const event = require(`${file_path}/${event_file}`);
    const event_name = event_file.split(".").shift();
    client.on(event_name, event.bind(null, client));
  }

  console.log(`Loaded ${event_files.length} events :)`);
};
