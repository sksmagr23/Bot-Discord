const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides info. about the user.'),
	async execute(interaction) {
		await interaction.reply(`command runned by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
	},
};