const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const fs = require("fs");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('globalstats')
		.setDescription('Global stats for the dunk tank.'),
	async execute(interaction) {
        var embed = new EmbedBuilder()
            .setColor(0xDE9B6E)
            .setTitle('Dunk Tank Stats')
            .setDescription(":3")
		await fs.readFile(global.statsPath, (error, data) => {
			if (error) {
				console.error(error);
			}
			const stats = JSON.parse(data);
			embed.addFields(
                {name:"Threw a ball", value:`${stats.dunkTank.throws} times`},
				{name:"The ball hit", value:`${stats.dunkTank.hit} times`},
				{name:"The ball missed", value:`${stats.dunkTank.miss} times`}
            )
            interaction.reply({embeds: [embed]});
		});
	},
};
