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

function handleKickCommand(session, request) {
    if (!session.player) {
        return;
    }
    if (session.player.rank !== Player.Rank.ADMIN) {
        return;
    }

    let player = findPlayer(session.server, request.name);

    if (player !== null) {
        player.send.alertKick(() => player.session.close());
        session.send.adminMessage(`Successfully kicked ${request.name}`);
    } else {
        session.send.adminMessage(`Could not locate player: ${request.name}`);
    }
}

function handleBanCommand(session, request) {
    if (!session.player) {
        return;
    }
    if (session.player.rank !== Player.Rank.ADMIN) {
        return;
    }
    player.send.adminMessage('Banning is not implemented -- kicking user...');
    handleKickCommand(session, request);
}

module.exports = function(commandHandlers) {
    commandHandlers.on('command-kick', handleKickCommand);
    commandHandlers.on('command-ban', handleBanCommand);
};
