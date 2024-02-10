const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = getCommands('./commands');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        let command = client.command.get(interaction.commandName);

        try{
          if (interaction.replied) return;
          command.execute(interaction);
        } catch (error){
          console.error(error);
        }
    }
}

function getCommands(dir) {
    let commands = new Collection();
    const commandFiles = getFiles(dir);

    for (const file of commandFiles) {
        const command = require("."+commandFiles);
        commands.set(command.data.toJSON().name, command);
    }
    return commands;
}

function getFiles(dir) {
    const files = fs.readdirSync(dir, {
        withFileTypes: true
    });
    let commands = [];

    for (const file of files) {
        if(file.isDirectory()) {
            commandFiles = [
                ...commandFiles,
                ...getFiles(`${dir}/${file.namr}`)
            ]
        } else if (file.name.endsWith(".js")) {
            commandFiles.push(`${dir}/${file.name}`);
        }
    }
    return commandFiles;
}