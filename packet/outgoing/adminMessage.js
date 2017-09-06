const SessionState = require('../../model/session_state');

function determineType(sender) {
    switch (sender.session.state) {
        case SessionState.LOBBY.IDLE:
            return 'lobby';
    }
}

module.exports.name = 'adminMessage';

module.exports.send = function(session) {
    return (message) => {
        let args = [
            determineType(session.player),
            'sheriffsay', message
        ];
        session.protocol.writeData(args.join('\t'));
    }
};
