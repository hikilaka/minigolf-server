const regex = /^d (\d+) language\t(.+)$/;

module.exports = function(command) {
    const match = command.match(regex);

    if (!match) {
        return null;
    }

    return {
        event: 'set-locale',
        args: {
            locale: match[2]
        }
    };
};
