const Lobby = require('../../model/lobby');

function count(server, type) {
    return server.lobbies.get(type).size;
}

module.exports.name = 'selectLobbyPlayerCount';

module.exports.send = function(session) {
    return () => {
        let args = ['lobbyselect', 'nop',
            count(session.server, Lobby.Type.SINGLE_PLAYER),
            count(session.server, Lobby.Type.TWO_PLAYER),
            count(session.server, Lobby.Type.MULTI_PLAYER)];

        session.protocol.writeData(args.join('\t'));
    }
};
