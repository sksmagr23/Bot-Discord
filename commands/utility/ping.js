const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with hey mate!'),
	async execute(interaction) {
		await interaction.reply('hey mate!');
	},
};