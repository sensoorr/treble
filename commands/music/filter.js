module.exports = {
    name: 'filter',
    aliases: [],
    utilisation: '{prefix}filter [filter name]',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

   if (!queue || !queue.playing) return message.channel.send({ content: `No music is currently playing.` });

        const actualFilter = queue.getFiltersEnabled()[0];

        if (!args[0]) return message.channel.send({ content: `Please enter a valid filter name, e.g. \n\`bassboost, 8D, nightcore\`` });

        const filters = [];
        queue.getFiltersEnabled().map(x => filters.push(x));
        queue.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filter) return message.channel.send({ content: `I couldn't find a filter with that name. \n\`bassboost, 8D, nightcore\`` });

        const filtersUpdated = {};

        filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

        await queue.setFilters(filtersUpdated);

        message.channel.send({ content: `${queue.getFiltersEnabled().includes(filter) ? 'Applied' : 'Unapplied'} filter: **${filter}**` });
    },
};
