const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'stop',
    aliases: [],
    utilisation: '{prefix}stop',
    voiceChannel: true,

    execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `No music is currently playing.` });

        queue.destroy();

        const embed = new MessageEmbed();
        embed.setColor('BLUE');
        embed.setTitle(`The queue has been cleared.`);
        embed.setDescription("Goodbye!");
        message.channel.send({ embeds: [embed]} );
    },
};
