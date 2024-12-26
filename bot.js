const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");
const fs = require("node:fs");
const path = require("node:path");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

function loadCommands() {
  const commands = path.join(__dirname, "commands");
  fs.readdirSync(commands).forEach((folder) => {
    const files = fs
      .readdirSync(path.join(commands, folder))
      .filter((file) => file.endsWith(".js"));

    files.forEach((file) => {
      const command = require(path.join(commands, folder, file));
      if (command.data && command.execute) {
        client.commands.set(command.data.name, command);
      } else {
        console.log(`⚠️ Command ${file} is missing some properties!`);
      }
    });
  });
}

function loadEvents() {
  const events = path.join(__dirname, "events");
  fs.readdirSync(events)
    .filter((file) => file.endsWith(".js"))
    .forEach((file) => {
      const event = require(path.join(events, file));
      client.on(event.name, (...args) => event.execute(...args));
    });
}

loadCommands();
loadEvents();
client.login(token);
