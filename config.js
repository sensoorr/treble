module.exports = {
    px: '.',
    playing: 'music | .help',

opt: {
    DJ: {
        enabled: false,
        roleName: 'Treble DJ',
        commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'skip', 'stop', 'volume']
    },
    selfDeaf: true,
    maxVol: 200,
    loopMessage: false,
    discordPlayer: {
        ytdlOptions: {
            quality: 'highestaudio',
            highWaterMark: 1 << 25
        }
    }
}
};
