const fs = require("node:fs");
const path = require("node:path");
const { REST } = require("@discordjs/rest");
const { Router } = require("@discord.js");
const { clientID, guildID, token } = require("./config.json");

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

let command = [];
const commandFiles = getFiles('./commands');

for (const file of commandFiles) {
    const command = require(file);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(token);

rest.put(Router.applicationGuildCommands(clientID, guildID), { body: commands })
    .then(() => console.log('Đã đăng kí thành công các lệnh ứng dụng!'))
    .catch(console.error);