const fs = require('fs'),
      path = require('path'),
      stream = require('stream'),
      transformers = new Set();

fs.readdirSync(__dirname).forEach(file => {
    if (file === path.basename(__filename)) return;
    if (!/\.js$/.test(file)) return;
    
    const transformer = require(path.join(__dirname, file));
    transformers.add(transformer);
});

class CommandTransform extends stream.Transform {
    constructor(opts) {
        super(opts);
    }
    _transform(chunk, encoding, callback) {
        let modified = chunk.toString();
        transformers.forEach(transform => {
            let result = transform(modified);

            if (result !== null) {
                this.push(result);
                callback();
            }
        });
    }
}

module.exports = CommandTransform;
