const regex = /^d (\d+) (.+)\tcommand\tkick\t(.+)$/;

module.exports = function(command) {
    const match = command.match(regex);

    if (!match) {
        return null;
    }

    return {
        event: 'command-kick',
        args: {
            name: match[3]
        }
    };
};
