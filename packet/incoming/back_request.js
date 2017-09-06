const Lobby = require('../../model/lobby'),
      SessionState = require('../../model/session_state');

function handleBackRequest(session, request) {
    switch (session.state) {
        case SessionState.LOBBY.IDLE:
            const lobby = session.player.lobby;
            lobby.remove(session.player, Lobby.PartType.SWITCHED_LOBBIES);
            session.setState(SessionState.LOBBY.SELECT_TYPE);
            session.send.selectLobby();
            break;
    }
}

module.exports = function(commandHandlers) {
    commandHandlers.on('request-back', handleBackRequest);
};
