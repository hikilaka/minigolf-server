const byline = require('byline'),
      streamifier = require('streamifier'),
      CommandTransform = require('./packet/transform');

const streamOptions = { objectMode: true };

class Protocol {
    constructor(session) {
        this.session = session;
        this.incomingDataCount = 0; // TODO: should this be verified?
        this.outgoingDataCount = 0;
    }
    // [specialized] data writing functions
    write(data, done) {
        this.session.socket.write(data, done);
    }
    writeLine(data, done) {
        console.log(`wrote: ${data}`);
        this.write(`${data}\n`, done);
    }
    writeConnection(data, done) {
        this.writeLine(`c ${data}`, done);
    }
    writeScript(data, done) {
        this.writeLine(`s ${data}`);
    }
    writeData(data, done) {
        this.writeLine(`d ${this.outgoingDataCount} ${data}`);
        this.outgoingDataCount += 1;
    }
    // transforms buffers into workable objects
    handleReceived(data) {
        streamifier.createReadStream(data, streamOptions)
                   .pipe(new byline.LineStream())
                   .pipe(new CommandTransform(streamOptions))
                   .on('data', (data) => {
                       if (this.session.handleCommand(data)) {
                           this.session.updateTimeout();
                       }
                   })
                   .on('proto error', (err) => console.log(`error: ${err}`));
    }
};

module.exports = Protocol;
