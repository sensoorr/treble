const Discord = require('discord.js');
module.exports = {
    name: 'ping',
    aliases: [],
    utilisation: '{prefix}ping',

    execute(client, message) {
        const start = Date.now();
        message.channel.send('Pong!').then(m => {
            const embed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle(client.user.username + " - Pong!")
                .setThumbnail(client.user.displayAvatarURL())
                .addField(`Message Ping`, `\`${Date.now() - start}ms\``)
                .addField(`Message Latency`, `\`${m.createdTimestamp - start}ms\``)
                .addField(`API Latency`, `\`${Math.round(client.ws.ping)}ms\``)
                .setTimestamp()
                .setFooter({ text: 'Treble', iconURL: message.author.avatarURL({ dynamic: true }) });
            m.edit({ embeds: [embed] });
        })
    },
};
