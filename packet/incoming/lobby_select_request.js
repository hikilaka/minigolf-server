const SessionState = require('../../model/session_state');

function handleLobbySelect(session, request) {
    if (!session.ensureState(SessionState.LOBBY.SELECT_TYPE)) {
        return;
    }

    const lobby = session.server.lobbies.get(request.lobbyType);
    lobby.add(session.player);
    console.log(`${session.player.name} joined lobby ${request.lobbyType}`);
}

module.exports = function(commandHandlers) {
    commandHandlers.on('request-select-lobby', handleLobbySelect);
};
