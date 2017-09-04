const Lobby = require('../../model/lobby');

const regex = /^d (\d+) lobbyselect\tselect\t(1h?|x)$/;

// CLIENT> WRITE "d 5 lobbyselect	select	1h" (w/ hidden)
// CLIENT> WRITE "d 5 lobbyselect	select	1"
// CLIENT> WRITE "d 5 lobbyselect	select	x"


module.exports = function(command) {
    const match = command.match(regex);

    if (!match) {
        return null;
    }

    let args = {};

    switch (match[2]) {
        case '1':
            args.lobbyType = Lobby.Type.SINGLE_PLAYER;
            break;
        case '1h':
            args.lobbyType = Lobby.Type.SINGLE_PLAYER;
            args.hidden = true;
            break;
        case 'x':
            args.lobbyType = Lobby.Type.MULTI_PLAYER;
            break;
    }

    return {
        event: 'request-select-lobby',
        args: args
    };
};
