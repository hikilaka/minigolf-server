const Lobby = require('../../model/lobby');

function reasonToInt(reason) {
    switch (reason) {
        case Lobby.PartType.STARTED_GAME:
            return 1;
        case Lobby.PartType.JOINED_GAME:
            return 3;
        case Lobby.PartType.DISCONNECTED:
            return 5;
        case Lobby.PartType.SWITCHED_LOBBIES:
            return 4;
    }
}

module.exports.name = 'lobbyPart';

module.exports.send = function(session) {
    return (player, reason) => {
        let args = ['lobby', 'part', player.name, reasonToInt(reason)];
        session.protocol.writeData(args.join('\t'));
    }
};
