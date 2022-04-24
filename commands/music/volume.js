const maxVol = require("../../config.js").opt.maxVol;

module.exports = {
    name: 'volume',
    aliases: ['vol'],
    utilisation: `{prefix}volume [1-${maxVol}]`,
    voiceChannel: true,

    execute(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

       if (!queue || !queue.playing) return message.channel.send({ content: `No music is currently playing.` });

        const vol = parseInt(args[0]);

        if (!vol) return message.channel.send({ content: `Current volume: **${queue.volume}**\n**To change the volume, type a number between \`1\` and \`${maxVol}\`**` });

        if (queue.volume === vol) return message.channel.send({ content: `That is the current volume.` });

        if (vol < 0 || vol > maxVol) return message.channel.send({ content: `**To change the volume, type a number between \`1\` and \`${maxVol}\`**` });

        const success = queue.setVolume(vol);

        return message.channel.send({ content: success ? `New volume: **${vol}%**/**${maxVol}%**` : `Something went wrong.` }) ;
    },
};
