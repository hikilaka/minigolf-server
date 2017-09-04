const config = require('../../config'),
      SessionState = require('../../model/session_state');

function handleSetLocale(session, request) {
    if (!session.ensureState(SessionState.LOADING.VERIFYING_LOCALE)) {
        return;
    }

    if (config.supportedLocales.indexOf(request.locale) > -1) {
        session.setState(SessionState.LOADING.VERIFYING_LOGIN_TYPE);
        session.locale = request.locale;
    } else {
        console.log(`${session} requested an unsupported ` +
            `locale: ${request.locale}`);
        session.close();
    }
}

module.exports = function(commandHandlers) {
    commandHandlers.on('set-locale', handleSetLocale);
}
