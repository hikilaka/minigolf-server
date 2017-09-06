const config = require('../../config');

function boolToStr(bool) {
    return bool ? 't' : 'f';
}

module.exports.name = 'playerConfig';

module.exports.send = function(session) {
    return () => {
        let args = ['t', session.player.rank,
                    boolToStr(config.chatFilter),
                    boolToStr(config.disableGuestChat)];

        session.protocol.writeData('basicinfo\t' + args.join('\t'));
    }
};
