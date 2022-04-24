module.exports = {
    name: 'discord',
    aliases: ['support'],
    utilisation: '{prefix}discord',
    voiceChannel: false,

    async execute(message) {
        message.channel.send({ content: "https://discord.gg/Y4aehUckxa" });
    },
};