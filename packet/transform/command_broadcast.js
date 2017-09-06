const regex = /^d (\d+) (.+)\tcommand\tbroadcast\t(.+)$/;

module.exports = function(command) {
    const match = command.match(regex);

    if (!match) {
        return null;
    }

    return {
        event: 'command-broadcast',
        args: {
            message: match[3]
        }
    };
};
