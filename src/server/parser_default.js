'use strict';

class DefaultDataParser {
    constructor(config){
        this.config = Object.assign({}, config);
        this.type = 'default';
    }

    parse(value){
        return {
            value : this.config.text_parse_error,
            color: this.config.color_warning
        };
    }
}


exports.newParser = function (options) {
    return new DefaultDataParser(options);
}