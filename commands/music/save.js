const Discord = require('discord.js');

module.exports = {
    name: 'save',
    aliases: [],
    utilisation: '{prefix}save',
    voiceChannel: true,

    async execute(client, message) {
        const queue = client.player.getQueue(message.guild.id);

  if (!queue || !queue.playing) return message.channel.send({ content: `No music is currently playing.` });

  const embed = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setTitle(client.user.username + " - Save Track")
  .setThumbnail(client.user.displayAvatarURL())
  .addField(`Track`, `\`${queue.current.title}\``)
  .addField(`URL`, `${queue.current.url}`)
  .addField(`Duration`, `\`${queue.current.duration}\``)
  .addField(`Saved Server`, `\`${message.guild.name}\``)
  .addField(`Requested By`, `${queue.current.requestedBy}`)
  .setTimestamp()
  .setFooter({ text: 'Treble', iconURL: message.author.avatarURL({ dynamic: true }) });
  message.author.send({ embeds: [embed] }).then(() => {
            message.channel.send({ content: `I have sent you the name of the music via DM.` });
        }).catch(error => {
            message.channel.send({ content: `Unable to send you the name of the song via DM. Check if your DM's are open and try again.` });
        });
    },
};
