const SessionState = require('../../model/session_state');

function determineType(sender) {
    switch (sender.session.state) {
        case SessionState.LOBBY.IDLE:
            return 'lobby';
    }
}

module.exports.name = 'chat';

module.exports.send = function(session) {
    return (sender, receiver, message) => {
        let args = [
            determineType(sender),
            'say', receiver, sender.name, message
        ];
        session.protocol.writeData(args.join('\t'));
    }
};
