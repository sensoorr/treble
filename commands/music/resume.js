const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'resume',
    aliases: [],
    utilisation: '{prefix}resume',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);
        const track = queue.current;

        if (!queue) return message.channel.send({ content:`No music is currently playing.` });

        await queue.setPaused(false);

        const embed = new MessageEmbed();
        embed.setColor('BLUE');
        embed.setTitle(`Resumed`);
        embed.setDescription(track.title);
        message.channel.send({ embeds: [embed]} );
    },
};
