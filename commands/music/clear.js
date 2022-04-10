module.exports = {
    name: 'clear',
    aliases: [],
    utilisation: '{prefix}clear',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send({ content: `No music is currently playing.` });

        if (!queue.tracks[0]) return message.channel.send({ content: `Nothing else is in the queue.` });

        await queue.clear();

        message.channel.send({ content: `The queue has been cleared.` });
    },
};
