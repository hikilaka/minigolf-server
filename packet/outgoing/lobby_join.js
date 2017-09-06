module.exports.name = 'lobbyJoin';

module.exports.send = function(session) {
    return (player, returnedFromGame) => {
        let args = ['lobby'];

        if (player === session.player) {
            args.push('ownjoin');
        } else {
            args.push(returnedFromGame ? 'joinfromgame' : 'join');
        }

        args.push(player.toString());
        session.protocol.writeData(args.join('\t'));
    }
};
