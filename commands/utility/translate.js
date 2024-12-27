const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const translate = require('@iamtraction/google-translate');
const langList = require('../../extras/langList.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('translate')
        .setDescription('Multi Language translation')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Text to translate')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('language')
                .setDescription('Target language')
                .setRequired(true)
                .addChoices(
                    ...Object.entries(langList).map(([code, name]) => ({
                        name: name,
                        value: code
                    }))
                )),

    async execute(interaction) {
        try {
            await interaction.deferReply();

            const text = interaction.options.getString('text');
            const targetLang = interaction.options.getString('language');

            const translated = await translate(text, { to: targetLang });

            const translationEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .addFields(
                    { name: 'Original Text', value: text },
                    { name: `Translated Text (${targetLang})`, value: translated.text }
                )
                .setTimestamp();

            await interaction.editReply({ embeds: [translationEmbed] });

        } catch (error) {
            console.error(error);
            await interaction.editReply('Unable to translate text T_T');
        }
    },
};