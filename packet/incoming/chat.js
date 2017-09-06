const SessionState = require('../../model/session_state');

function isPublic(request) {
    return Number.isInteger(+request.receiver);
}

function sendChat(players, sender, request) {
    for (let player of players) {
        if (player === sender) {
            continue;
        }

        player.send.chat(sender, request.receiver, request.message);
    }
}

function handleChat(session, request) {
    switch (session.state) {
        case SessionState.LOBBY.IDLE:
            const lobby = session.player.lobby;
            if (isPublic(request)) {
                sendChat(lobby.players, session.player, request);
            } else {
                const receiver = lobby.getPlayer(request.receiver);

                if (receiver === null) return;
                receiver.send.privateChat(session.player, request.message);
            }
            break;
    }
}

module.exports = function(commandHandlers) {
    commandHandlers.on('chat', handleChat);
};
