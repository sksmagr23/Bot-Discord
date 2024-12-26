const { Events, MessageFlags } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`Command ${interaction.commandName} not found`);
			return;
		}
		
		try {
			await command.execute(interaction);
		} catch (err) {
			console.error(err);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'Oops! Error in execution T_T', flags: MessageFlags.Ephemeral });
			} else {
				await interaction.reply({ content: 'Oops! Error in execution T_T', flags: MessageFlags.Ephemeral });
			}
		}
	},
};