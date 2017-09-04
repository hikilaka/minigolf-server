const Connections = require('../../model/connections'),
      SessionState = require('../../model/session_state');

function handleIDRequest(session, request) {
    // ensure the session has not already been registered
    // in the connection repository
    if (session.hasOwnProperty('index')) {
        return;
    }

    // ensure the session is in the correct state--sessions cannot
    // and will not arbitrarily request a new identifier
    if (!session.ensureState(SessionState.LOADING.REQUESTING_ID)) {
        return;
    }

    if (request.type === 'new') {
        Connections.add(session); // will set session.index
        session.setState(SessionState.LOADING.VERIFYING_VERSION);
        session.send.id();
        console.log(`Registered session #${session.index}: ${session}`);
    } else if (request.type === 'old') {
        // resuming previous sessions is currently not supported
        session.close();
    }
}

module.exports = function(commandHandlers) {
    commandHandlers.on('request-identifier', handleIDRequest);
};
