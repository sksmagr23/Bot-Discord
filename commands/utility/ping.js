const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Casual Intro!'),
	async execute(interaction) {
		await interaction.reply('hey buddy! skx_bot here! XD');
	},
};