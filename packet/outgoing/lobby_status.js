const Lobby = require('../../model/lobby');

module.exports.name = 'lobbyStatus';

module.exports.send = function(session) {
    return (lobby) => {
        let args = ['status', 'lobby'];

        switch (lobby.type) {
            case Lobby.Type.SINGLE_PLAYER:
                args.push('1');
                break;
            case Lobby.Type.TWO_PLAYER:
                args.push('2');
                break;
            case Lobby.Type.MULTI_PLAYER:
                args.push('x');
                break;
        }

        session.protocol.writeData(args.join('\t'));
    }
};
