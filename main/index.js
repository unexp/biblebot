const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");

const dotenv = require("dotenv");
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (c) => {
  console.log(`✝ Logged into ${c.user.tag} ✝`);
});

client.login(process.env.TOKEN);

client.commands = new Collection();

const folderPath = path.join(__dirname, "../commands");
const commandFolders = fs.readdirSync(folderPath);

for (const folder of commandFolders) {
  const commandPath = path.join(folderPath, folder);
  const commandFiles = fs
    .readdirSync(commandPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`${filePath} is missing a required property`);
    }
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`Command ${interaction.commandName} was not found`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "Ahh error",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "Ahh error",
        ephemeral: true,
      });
    }
  }
});
