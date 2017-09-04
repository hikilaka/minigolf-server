module.exports.name = 'lobbyJoin';

module.exports.send = function(session) {
    return (player, returnedFromGame) => {
        let args = [
            player !== session.player && returnedFromGame ? 'joinfromgame' : 'join',
            player === session.player ? 'ownjoin' : 'join',
            player.toString()
        ];

        session.protocol.writeData(args.join('\t'));
    }
};
