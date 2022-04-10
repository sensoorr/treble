const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'pause',
    aliases: [],
    utilisation: '{prefix}pause',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);
        const track = queue.current;

        if (!queue || !queue.playing) return message.channel.send({ content: `No music is currently playing.` });

        queue.setPaused(true);

        const embed = new MessageEmbed();
        embed.setColor('BLUE');
        embed.setTitle(`Paused`);
        embed.setDescription(track.title);
        message.channel.send({ embeds: [embed]} );
    },
};
