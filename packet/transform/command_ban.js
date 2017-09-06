const regex = /^d (\d+) (.+)\tcommand\tban\t(.+)\t(\d+)$/;

module.exports = function(command) {
    const match = command.match(regex);

    if (!match) {
        return null;
    }

    return {
        event: 'command-ban',
        args: {
            name: match[3],
            duration: +match[4]
        }
    };
};
