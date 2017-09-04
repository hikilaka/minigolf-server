const Lobby = require('../../model/lobby');

function count(server, type) {
    const lobby = server.lobbies.get(type);

    return [lobby.size, lobby.gamePlayerSize];
}

module.exports.name = 'lobbyPlayerCount';

module.exports.send = function(session) {
    return () => {
        let args = ['lobby', 'numberofusers'];
        args = args.concat(count(session.server, Lobby.Type.SINGLE_PLAYER));
        args = args.concat(count(session.server, Lobby.Type.TWO_PLAYER));
        args = args.concat(count(session.server, Lobby.Type.MULTI_PLAYER));

        session.protocol.writeData(args.join('\t'));
    }
};
