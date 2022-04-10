const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'shuffle',
    aliases: ['sh'],
    utilisation: '{prefix}shuffle',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `No music is currently playing.` });

        queue.shuffle();

        const embed = new MessageEmbed();
        embed.setColor('BLUE');
        embed.setTitle(`Shuffled the queue`);
        message.channel.send({ embeds: [embed]} );
    },
};