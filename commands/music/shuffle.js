const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    name: 'shuffle',
    aliases: ['sh'],
    utilisation: '{prefix}shuffle',
    voiceChannel: true,

    async execute(client, message) {
        if (message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            const queue = client.player.getQueue(message.guild.id);

            if (!queue || !queue.playing) return message.channel.send({ content: `No music is currently playing.` });
    
            await queue.shuffle();
    
            const embed = new MessageEmbed();
            embed.setColor('BLUE');
            embed.setTitle(`Shuffled the queue`);
            message.channel.send({ embeds: [embed]} );
        } else {
            message.channel.send({ content: "You don't have permission to use this command." });
        };
    },
};