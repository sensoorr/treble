const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'skip',
    aliases: [],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);
        const track = queue.current;
 
        if (!queue || !queue.playing) return message.channel.send({ content: `No music is currently playing.` });

        queue.skip();

        const embed = new MessageEmbed();
        embed.setColor('BLUE');
        embed.setTitle(`Skipped`);
        embed.setDescription(track.title);
        message.channel.send({ embeds: [embed]} );
    },
};
