const { SlashCommandBuilder } = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('xin chao người nào đó')
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('người dùng gửi lời chào đến')
                .setRequired(false)
        ),

        async execute(interaction){
            const user = interaction.options.getUser("user") || interaction.user;
            interaction.reply(`Xin Chao ${user.username}!`);
    }
}
