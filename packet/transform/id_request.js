const regex = /^c (new|old)$/;

module.exports = function(command) {
    const match = command.match(regex);

    if (!match) {
        return null;
    } 

    return {
        event: 'request-identifier',
        args: {
            type: match[1]
        }
    };
};
