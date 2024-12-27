const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
        if (!channel) return;

        await channel.send(`Welcome to Magix, ${member.user.username}! 👋`);
    }
};