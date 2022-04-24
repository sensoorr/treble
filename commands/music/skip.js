const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    name: 'skip',
    aliases: [],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    async execute(client, message) {
        if (message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            const queue = client.player.getQueue(message.guild.id);
            const track = queue.current;
     
            if (!queue || !queue.playing) return message.channel.send({ content: `No music is currently playing.` });
    
            await queue.skip();
    
            const embed = new MessageEmbed();
            embed.setColor('BLUE');
            embed.setTitle(`Skipped`);
            embed.setDescription(track.title);
            message.channel.send({ embeds: [embed]} );    
        } else {
            message.channel.send({ content: "You don't have permission to use this command." });
        };
    },
};
