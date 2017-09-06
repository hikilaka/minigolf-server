const Lobby = require('../../model/lobby'),
      Player = require('../../model/Player'),
      SessionState = require('../../model/session_state');

function findPlayer(server, name) {
    name = name.toUpperCase();

    for (let session of server.sessions.values()) {
        if (!session.hasOwnProperty('player')) {
            continue;
        }

        if (session.player.name.toUpperCase() === name) {
            return session.player;
        }
    }
}

function handleMessageCommand(session, request) {
    if (!session.player) {
        return;
    }
    if (session.player.rank !== Player.Rank.ADMIN) {
        return;
    }

    let player = findPlayer(session.server, request.name);

    if (player !== null) {
        player.send.adminMessage(request.message);
        session.send.adminMessage(`Successfully messaged ${request.name}`);
    } else {
        session.send.adminMessage(`Could not locate player: ${request.name}`);
    }
}

module.exports = function(commandHandlers) {
    commandHandlers.on('command-message', handleMessageCommand);
};
