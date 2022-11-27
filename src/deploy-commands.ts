import { REST, Routes } from "discord.js";
import * as dotenv from 'dotenv';
dotenv.config();
import { readdirSync } from 'fs';
import { join } from 'path';

const commands = [];
const commandsPath = join(__dirname, 'commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('command.ts'));
for(const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command) {
        commands.push(command.data.toJSON());
    }
}
const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN!);
(async () => {
    try {
        console.log(`Started refreshing application ${commands.length} commands.`);
        const data = await rest.put(
            Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!),
            { body: commands },
        );
        // @ts-ignore
        console.log(`Successfully reloaded application ${data.length} commands.`);
    } catch (error) {
        console.error(error);
    }
})();

       

console.log("commands=",commands);