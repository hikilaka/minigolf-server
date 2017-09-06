const regex = /^d (\d+) lobby\t(say|sayp)\t(.+)\t(.+)$/;

module.exports = function(command) {
    const match = command.match(regex);

    if (!match) {
        return null;
    }

    return {
        event: 'chat',
        args: {
            message: match[4],
            receiver: match[3]
        }
    };
};
