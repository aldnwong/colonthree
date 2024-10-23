const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const fs = require("fs");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('memberstats')
		.setDescription('A member\'s stats for the dunk tank.'),
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
            let id = interaction.user.id;
			embed.addFields(
                {name:"Threw a ball", value:`${stats.dunkTank.players[id].throws} times`},
				{name:"The ball hit", value:`${stats.dunkTank.players[id].hit} times`},
				{name:"The ball missed", value:`${stats.dunkTank.players[id].miss} times`},
                {name:"Got dunked", value:`${stats.dunkTank.players[id].dunked} times`},
                {name:"Survived", value:`${stats.dunkTank.players[id].survived} times`}
            )
            interaction.reply({embeds: [embed]});
		});
	},
};
