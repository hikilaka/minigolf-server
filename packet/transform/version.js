const regex = /^d (\d+) version\t(\d+)$/;

module.exports = function(command) {
    const match = command.match(regex);

    if (!match) {
        return null;
    }

    return {
        event: 'verify-version',
        args: {
            version: +match[2]
        }
    };
};
