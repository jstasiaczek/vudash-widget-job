"use strict";



class ParserFactory{
    constructor(config){
        this.config = Object.assign({}, config);
    }

    get(type){
        try {
            return require(`./parser_${type}`).newParser(this.config);
        } catch (error) {
            return require('./parser_default').newParser(this.config);
        }
    }
}

exports.newFactory = function (options) {
    return new ParserFactory(options);
}

