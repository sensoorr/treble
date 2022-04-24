const { Permissions } = require('discord.js');

module.exports = {
    name: 'leave',
    aliases: [],
    utilisation: '{prefix}leave',
    voiceChannel: true,

    async execute(client, message) {
        if (message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            const queue = client.player.getQueue(message.guild.id);

            if (!queue || !queue.playing) return message.channel.send({ content: `No music is currently playing.` });    
            await queue.destroy();

            message.channel.send({ content: "Left the voice channel." });
        } else {
            message.channel.send({ content: "You don't have permission to use this command." });
        };
    },
};
