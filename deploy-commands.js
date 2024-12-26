const { REST, Routes } = require("discord.js");
const { clientId, guildId, token } = require("./config.json");
const fs = require("node:fs");
const path = require("node:path");

async function loadCommands() {
  const commands = [];
  const foldersPath = path.join(__dirname, "commands");

  fs.readdirSync(foldersPath).forEach((folder) => {
    fs.readdirSync(path.join(foldersPath, folder))
      .filter((file) => file.endsWith(".js"))
      .forEach((file) => {
        const command = require(path.join(foldersPath, folder, file));
        if ("data" in command && "execute" in command) {
          commands.push(command.data.toJSON());
        } else {
          console.log(`⚠️ Command ${file} missing some properties!`);
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
    console.log("Congo, commands deployed successfully!");
  } catch (err) {
    console.error(err);
  }
}

deployCommands();
