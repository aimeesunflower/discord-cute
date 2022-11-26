import { Client, Events, GatewayIntentBits, Collection } from 'discord.js';
import * as dotenv from 'dotenv';
dotenv.config();
import r from './reddit';
import commands from './commands';

console.log(process.env.DISCORD_TOKEN);
const discordClient = new Client({ intents: [GatewayIntentBits.GuildMessages] });

discordClient.once(Events.ClientReady, (c) => {
	console.log(`Logged in as ${c.user.tag}!`);
});

discordClient.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isCommand()) return;
	const command = commands.get(interaction.commandName);
	if (!command) {
		console.log(`[WARNING] The command ${interaction.commandName} is not registered.`);
		return;
	}
	try {
		// @ts-ignore
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

discordClient.login(process.env.DISCORD_TOKEN);
