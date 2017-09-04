const regex = /^d (\d+) lobbyselect\trnop$/;

module.exports = function(command) {
    const match = command.match(regex);

    if (!match) {
        return null;
    }

    return {
        event: 'request-lobby-player-count',
        args: {}
    };
};
