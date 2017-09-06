const regex = /^d (\d+) (.+)\tcommand\tmessage\t(.+)\t(.+)$/;

module.exports = function(command) {
    const match = command.match(regex);

    if (!match) {
        return null;
    }

    return {
        event: 'command-message',
        args: {
            name: match[3],
            message: match[4]
        }
    };
};
