const SessionState = require('../../model/session_state');

// are these first two options ever used?
const TRACK_TEST_MODE = 'ttm';
const REGISTERED = 'reg'
const NOT_REGISTERED = 'nr';

function handleSetLoginType(session, request) {
    if (!session.ensureState(SessionState.LOADING.VERIFYING_LOGIN_TYPE)) {
        return;
    }

    session.loginType = request.loginType;
    session.setState(SessionState.LOADING.AWAITING_LOGIN);
    session.send.requestLogin();
}

module.exports = function(commandHandlers) {
    commandHandlers.on('set-login-type', handleSetLoginType);
};
