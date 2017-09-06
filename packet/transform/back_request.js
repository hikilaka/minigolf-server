const regex = /^d (\d+) lobby\tback$/;

module.exports = function(command) {
    const match = command.match(regex);

    if (!match) {
        return null;
    }

    return {
        event: 'request-back',
        args: {}
    };
};
