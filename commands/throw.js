const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs");
const { dunkChannel } = require("../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('throw')
		.setDescription('Throw.'),
	async execute(interaction) {
		await interaction.client.channels.fetch(dunkChannel)
			.then(channel => {
				if (channel.members.size == 0) return interaction.reply({content: "There is no one in the dunk tank right now.", ephemeral: true});
				else {
					let randInt = Math.floor(Math.random() * 10) + 1;
					let member = channel.members.random();
					if (randInt == 7) {
						fs.readFile(global.statsPath, (error, data) => {
							if (error) {
								console.error(error);
							}
							const stats = JSON.parse(data);
							stats.dunkTank.throws++;
							stats.dunkTank.hit++;
							stats.dunkTank.players[interaction.user.id].throws++;
							stats.dunkTank.players[interaction.user.id].hit++;
							stats.dunkTank.players[member.id].dunked++;
							fs.writeFile(global.statsPath, JSON.stringify(stats), function(err) {
								if (err) {
									console.log(err)
								}
							})
						});
						return interaction.reply("Hit!")
					} 
					else {
						fs.readFile(global.statsPath, (error, data) => {
							if (error) {
								console.error(error);
							}
							const stats = JSON.parse(data);
							stats.dunkTank.throws++;
							stats.dunkTank.miss++;
							stats.dunkTank.players[interaction.user.id].throws++;
							stats.dunkTank.players[interaction.user.id].miss++;
							stats.dunkTank.players[member.id].survived++;
							fs.writeFile(global.statsPath, JSON.stringify(stats), function(err) {
								if (err) {
									console.log(err)
								}
							})
						});
						return interaction.reply("Missed.");
					}
				}
			})
			.catch(console.error);
	},
};
