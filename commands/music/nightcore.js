module.exports = {
    name: 'nightcore',
    aliases: ['nc'],
    utilisation: '{prefix}nightcore',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

   if (!queue || !queue.playing) return message.channel.send({ content: `No music is currently playing.` });

        const actualFilter = queue.getFiltersEnabled()[0];
        const filters = [];
        queue.getFiltersEnabled().map(x => filters.push(x));
        queue.getFiltersDisabled().map(x => filters.push(x));

        const filter = 'nightcore';

        const filtersUpdated = {};

        filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

        await queue.setFilters(filtersUpdated);

        message.channel.send({ content: `${queue.getFiltersEnabled().includes(filter) ? 'Applied' : 'Unapplied'} filter: **Nightcore**` });
    },
};
