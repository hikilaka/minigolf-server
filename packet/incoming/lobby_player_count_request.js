const SessionState = require('../../model/session_state');

function handleLobbyCountRequest(session, request) {
    if (!session.ensureState(SessionState.LOBBY.SELECT_TYPE)) {
        return;
    }

    session.send.selectLobbyPlayerCount();
}

module.exports = function(commandHandlers) {
    commandHandlers.on('request-lobby-player-count', handleLobbyCountRequest);
};
