const { MessageEmbed } = require('discord.js');
const prettyMilliseconds = require("pretty-ms");

module.exports = {
    name: 'statistics',
    aliases: ['stats'],
    utilisation: '{prefix}statistics',

    execute(client, message) {
        const promises = [
			client.shard.fetchClientValues('guilds.cache.size'),
			client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
		];

		Promise.all(promises)
			.then(results => {
				const totalGuilds = String(results[0].reduce((acc, guildCount) => acc + guildCount, 0));
				const totalMembers = String(results[1].reduce((acc, memberCount) => acc + memberCount, 0));
                const embed = new MessageEmbed();
                embed.setColor('BLUE');
                embed.setTitle('Treble Statistics');
                embed.addField(`Servers`, `\`${totalGuilds}\``);
                embed.addField(`Users`, `\`${totalMembers}\``);
                embed.addField(`Uptime`, `\`${prettyMilliseconds(client.uptime)}\``);
                embed.addField(`Ping`, `\`${Math.round(client.ws.ping)}ms\``);
                message.channel.send({ embeds: [embed] });
			})
    },
};