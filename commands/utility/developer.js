const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('developer')
        .setDescription('Shows developer information'),
    async execute(interaction) {
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel('GitHub')
                .setStyle(ButtonStyle.Link)
                .setURL('https://github.com/sksmagr23')
        );

        await interaction.reply({
            content: "Check out my author's GitHub!",
            components: [row],
        });
    },
};
