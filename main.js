const { Player } = require('discord-player');
const { Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { readdirSync } = require('fs');
const downloader = require("@discord-player/downloader").Downloader;


let client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
});

client.config = require('./config');
client.player = new Player(client, client.config.opt.discordPlayer);
client.commands = new Collection();

const player = client.player
player.use("YOUTUBE_DL", downloader);
const events = readdirSync('./events/').filter(file => file.endsWith('.js'));

for (const file of events) {
    const event = require(`./events/${file}`);
    client.on(file.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
};

readdirSync('./commands/').forEach(dirs => {
    const commands = readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        client.commands.set(command.name.toLowerCase(), command);
        delete require.cache[require.resolve(`./commands/${dirs}/${file}`)];
    };
});

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    const embed = new MessageEmbed();
    embed.setColor('BLUE');
    embed.setTitle("Now playing");
    embed.setDescription(track.title);
    queue.metadata.send({ embeds: [embed]});
});

player.on('trackAdd', (queue, track) => {
    const embed = new MessageEmbed();
    embed.setColor('BLUE');
    embed.setTitle(`Added to queue`);
    embed.setDescription(track.title);
    queue.metadata.send({ embeds: [embed]});
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send({ content: 'I was disconnected from the voice channel.' });
});

player.on('channelEmpty', (queue) => {
    queue.metadata.send({ content: 'I left the voice channel as all other members left.' });
});

player.on('queueEnd', (queue) => {
    const embed = new MessageEmbed();
    embed.setColor('BLUE');
    embed.setTitle("The songs in the queue have finished.")
    queue.metadata.send({ embeds: [embed]});
});

if(client.config.TOKEN){
client.login(client.config.TOKEN).catch(e => {
console.log("The token you entered is incorrect. Please check if all of the bot's intents are switched on.")
})
} else {
console.log("Please write the bot token in the config.js file.")
}