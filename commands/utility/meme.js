const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const memeTemplates = require('../../memeTemps/memeTemplates.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Generate your meme using popular templates!')
        .addStringOption(option =>
            option.setName('template')
                .setDescription('Choose meme template')
                .setRequired(true)
                .addChoices(...memeTemplates))
        .addStringOption(option =>
            option.setName('toptext')
                .setDescription('Top text for the meme')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('bottomtext')
                .setDescription('Bottom text for the meme')
                .setRequired(true)),

    async execute(interaction) {
        try {
            await interaction.deferReply();
            
            const template = interaction.options.getString('template');
            const top = encodeURIComponent(interaction.options.getString('toptext'));
            const bottom = encodeURIComponent(interaction.options.getString('bottomtext'));

            const url = `https://apimeme.com/meme?meme=${template}&top=${top}&bottom=${bottom}`;

            const memeEmbed = new EmbedBuilder()
                .setImage(url)
                .setColor('#ff2d00')
                .setFooter({ text: `By ${interaction.user.username}` })

            await interaction.editReply({ embeds: [memeEmbed] });
        } catch (err) {
            await interaction.editReply('Unable to generate meme T_T, Please try again.');
        }
    },
};