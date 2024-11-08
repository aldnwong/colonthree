const Discord = require("discord.js");
const bot = new Discord.Client({intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildVoiceStates]});
const fs = require('fs');
const {clientToken, webPort, loggerName, environment} = require("./config.json")

global.bot = bot
global.environment = environment;
global.loggerName = loggerName;
global.statsPath = (environment == "PROD") ? "./data/stats.json" : "./data/devStats.json"

bot.once("ready", async () => {
    console.log(`[${loggerName}] Currently logged in as ${bot.user.username} in ${bot.guilds.cache.size} server(s).`);

	const express = require("express")
	const app = express()

	app.get('/', (req, res) => {
		var fs = require('fs');
		fs.readFile("./data/stats.json", (error, data) => {
			if (error) {
				console.error(error);
				res.send(error);
			}
			const stats = JSON.parse(data);
			res.send(`<h1>Hello!</h1>
				<p>Currently logged in as ${bot.user.username} in ${bot.guilds.cache.size} server(s).</p>
				<br>
				<br>
				<h2>Bot Stats</h2>
				<p>
				Throws: ${stats.dunkTank.throws}<br>
					Hit: ${stats.dunkTank.hit}<br>
					Miss: ${stats.dunkTank.miss}<br>
				</p>`);
		});
	})

	app.listen(webPort, function () {
		console.log(`[${loggerName}] Express server started on port ${webPort}.`);
	});
});

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.data.name, command);
}

bot.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = bot.commands.get(interaction.commandName);
	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		if (error.code == 50007) {
			return interaction.reply({ content: "I cannot DM this user. :<", ephemeral: true });
		} else {
			return interaction.reply({ content: "There was an error while executing this command! >:O\n`"+error.message+"`", ephemeral: true });
		}
	}
});

bot.login(clientToken);