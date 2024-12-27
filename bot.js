const {
  Client,
  Collection,
  REST,
  Routes,
  GatewayIntentBits,
} = require("discord.js");
const { token, clientId, guildId } = require("./config.json");
const fs = require("node:fs");
const path = require("node:path");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

async function loadCommands() {
  const commands = [];
  const commandsPath = path.join(__dirname, "commands");

  fs.readdirSync(commandsPath).forEach((folder) => {
    const files = fs
      .readdirSync(path.join(commandsPath, folder))
      .filter((file) => file.endsWith(".js"));

    files.forEach((file) => {
      const command = require(path.join(commandsPath, folder, file));
      if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
      } else {
        console.log(`Command ${file} is missing some properties!`);
      }
    });
  });
  return commands;
}

async function deployCommands() {
  try {
    const rest = new REST().setToken(token);
    const commands = await loadCommands();

    console.log(`Deploying ${commands.length} commands...`);
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });
    console.log("Commands deployed successfully!");
  } catch (error) {
    console.error("Error deploying commands:", error);
  }
}

function loadEvents() {
  const eventsPath = path.join(__dirname, "events");
  fs.readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"))
    .forEach((file) => {
      const event = require(path.join(eventsPath, file));
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }
    });
}

async function initializeBot() {
  await deployCommands();
  loadEvents();
  client.login(token);
}

initializeBot();
