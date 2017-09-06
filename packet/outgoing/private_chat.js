const SessionState = require('../../model/session_state');

function determineType(sender) {
    switch (sender.session.state) {
        case SessionState.LOBBY.IDLE:
            return 'lobby';
    }
}

module.exports.name = 'privateChat';

module.exports.send = function(session) {
    return (sender, message) => {
        let args = [
            determineType(sender),
            'sayp', sender.name, message
        ];
        session.protocol.writeData(args.join('\t'));
    }
};
