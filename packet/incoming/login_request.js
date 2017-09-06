const config = require('../../config'),
      Player = require('../../model/player'),
      SessionState = require('../../model/session_state');

function nameSuffix() {
    return Math.floor(Math.random() * 9999);
}

function handleLoginRequest(session, request) {
    if (!session.ensureState(SessionState.LOADING.AWAITING_LOGIN)) {
        return;
    }

    if (request.anonymous) {
        let name = config.baseGuestName + '-' + nameSuffix();
        session.loginType = 'anonymous';
        session.player = new Player(session, name);
    } else {
        // TODO: verify credentials
        session.loginType = 'registered';
        session.player = new Player(session, request.username);
        session.player.rank = Player.Rank.ADMIN;
    }

    console.log(`${session.player.name} has logged in`);
    session.setState(SessionState.LOBBY.SELECT_TYPE);
    session.send.playerConfig();
    session.send.selectLobby();
}

module.exports = function(commandHandlers) {
    commandHandlers.on('request-login', handleLoginRequest);
}
