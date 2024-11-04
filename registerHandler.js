const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientToken, clientId, guildId } = require('./config.json');
const flag = process.argv[2];
const fs = require('fs')

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const commands = []
for (const file of commandFiles) {
	commands.push(require(`./commands/${file}`).data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(clientToken);

switch (flag) {
	case '--guild':
		rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
			.then(() => console.log('Successfully registered all global application commands.'))
			.catch(console.error)
		break;
	case '--global':
		rest.put(Routes.applicationCommands(clientId), { body: commands })
			.then(() => console.log('Successfully registered all global application commands.'))
			.catch(console.error)
		break;
	case '--clearGuild':
		rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
			.then(() => console.log('Successfully deleted all guild commands.'))
			.catch(console.error);
		break;
	case '--clearGlobal':
		rest.put(Routes.applicationCommands(clientId), { body: [] })
			.then(() => console.log('Successfully deleted all application commands.'))
			.catch(console.error);
		break;
	default:
		console.error("No valid flags provided")
}
