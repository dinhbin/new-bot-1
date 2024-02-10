const { SlashCommandBuilder } = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('ping bot "Pongì!"'),

        async execute(interaction){
                interaction.reply("Pong!");
        }
}