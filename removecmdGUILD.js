const fs = require('fs')
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId, guildId } = require('./config.json');
const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
		.then(() => console.log('Successfully deleted all guild commands.'))
		.catch(console.error);

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	}
})();
