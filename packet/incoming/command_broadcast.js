const Player = require('../../model/Player'),
      SessionState = require('../../model/session_state');

function handleBroadcastCommand(session, request) {
    if (!session.player) {
        return;
    }
    if (session.player.rank !== Player.Rank.ADMIN) {
        return;
    }

    let message = `Broadcast: ${request.message}`;
    let players = null;

    switch (session.state) {
        case SessionState.LOBBY.IDLE:
            players = session.player.lobby.players;
            break;
    }

    if (players === null) {
        return;
    }

    players.forEach(p => p.send.message(message));
}

module.exports = function(commandHandlers) {
    commandHandlers.on('command-broadcast', handleBroadcastCommand);
};
