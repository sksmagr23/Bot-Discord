const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides info. about the user.'),
	async execute(interaction) {
		await interaction.reply({ content: `commanded by ${interaction.user.username}, who joined on ${interaction.member.joinedAt.toLocaleDateString()}.`, flags: MessageFlags.Ephemeral });
	},
};
