module.exports.name = 'lobbyPlayerNames';

module.exports.send = function(session) {
    return () => {
        const lobby = session.player.lobby;
        let args = ['lobby', 'users'];

        lobby.players.forEach(p => args.push(p.toString()));
        session.protocol.writeData(args.join('\t'));
    }
};
