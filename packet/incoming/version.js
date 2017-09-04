const config = require('../../config'),
      SessionState = require('../../model/session_state');

function handleVerifyVersion(session, request) {
    // ensure the session is in the correct state--sessions cannot
    // and will not arbitrarily verify version
    if (!session.ensureState(SessionState.LOADING.VERIFYING_VERSION)) {
        return;
    }

    if (request.version === config.version) {
        session.setState(SessionState.LOADING.VERIFYING_LOCALE);
        session.send.version(true);
    } else {
        // tell the client they have the wrong version
        // and, once written, close the session
        session.send.version(false, () => session.close());
    }
}

module.exports = function(commandHandlers) {
    commandHandlers.on('verify-version', handleVerifyVersion);
}
