module.exports = {
    name: 'discord',
    aliases: ['support'],
    utilisation: '{prefix}discord',
    voiceChannel: false,

    async execute(client, message) {
        await message.channel.send({ content: "https://discord.gg/Y4aehUckxa" });
    },
};