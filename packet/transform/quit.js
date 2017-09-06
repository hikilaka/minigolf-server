const regex = /^d (\d+) (lobby\t)?quit$/;

module.exports = function(command) {
    const match = command.match(regex);

    if (!match) {
        return null;
    }

    return {
        event: 'request-quit',
        args: {}
    };
};
