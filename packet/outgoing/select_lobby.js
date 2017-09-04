module.exports.name = 'selectLobby';

const args = ['status', 'lobbyselect', '300'];

module.exports.send = function(session) {
    return () => {
        session.protocol.writeData(args.join('\t'));
    }
};
