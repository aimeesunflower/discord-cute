import {Collection} from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

const commands = new Collection();

const commandsPath = join(__dirname, '.');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('command.ts'));

for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

export default commands;