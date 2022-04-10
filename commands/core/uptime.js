const prettyMilliseconds = require("pretty-ms");
module.exports = {
    name: 'uptime',
    aliases: [],
    utilisation: '{prefix}uptime',

    execute(client, message) {
        message.channel.send(`Uptime: ${prettyMilliseconds(client.uptime)}`)
    },
};
