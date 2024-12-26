const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides info. about the server.'),
	async execute(interaction) {
		await interaction.reply(`Welcome to ${interaction.guild.name} server, consisting of ${interaction.guild.memberCount} members. Feel free to interact!`);
	},
};