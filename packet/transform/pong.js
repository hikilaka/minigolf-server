const regex = /^c (new|old)$/;

module.exports = function(command) {
    if (command !== 'c pong') {
        return null;
    }

    return {
        event: 'pong',
        args: { }
    };
};
