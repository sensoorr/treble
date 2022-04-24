const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    name: 'stop',
    aliases: [],
    utilisation: '{prefix}stop',
    voiceChannel: true,

    async execute(client, message) {
        if (message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            const queue = client.player.getQueue(message.guild.id);

            if (!queue || !queue.playing) return message.channel.send({ content: `No music is currently playing.` });
        
            await queue.destroy();
        
            const embed = new MessageEmbed();
            embed.setColor('BLUE');
            embed.setTitle(`The queue has been cleared.`);
            embed.setDescription("Goodbye!");
            message.channel.send({ embeds: [embed]} );
        } else {
            message.channel.send({ content: "You don't have permission to use this command." });
        };
    },
};