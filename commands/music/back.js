const { Permissions } = require('discord.js');

module.exports = {
    name: 'back',
    aliases: [],
    utilisation: '{prefix}back',
    voiceChannel: true,

    async execute(client, message) {
        if (message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            const queue = client.player.getQueue(message.guild.id);

            if (!queue || !queue.playing) return message.channel.send({ content: `No music is currently playing.` });
    
            if (!queue.previousTracks[1]) return message.channel.send({ content: `No music was playing before.` });
    
            await queue.back();
    
            message.channel.send({ content: `Playing previous song.` });
    
        } else {
            message.channel.send({ content: "You don't have permission to use this command." });
        };
    },
};
