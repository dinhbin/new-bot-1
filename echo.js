const { SlashCommandBuilder } = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
        .setName("echo")
        .setDescription('Lặp lại những gì bạn nói')
        .addStringOption((option) =>
            option
                .setName("text")
                .setDescription('người dùng gửi lời chào đến')
                .setRequired(true)
        ),

        async execute(interaction){
            const text = interaction.options.getString("text");
            interaction.reply(text);
        }
}