'use strict';

class JenkinsDataParser {
    constructor(config){
        this.config = Object.assign({}, config);
        this.type = 'jenkins';
    }

    parse(value){
        if(!(value instanceof Object)){
            return {
                value : this.config.text_parse_error,
                color: this.config.color_warning
            };
        }
        return this.getResult(value);
    }

    getResult(value){
        if(value.building){
            return this.calculateProgress(value);
        }
        if(value.result == "SUCCESS"){
            return {
                color: this.config.color_success,
                value: this.config.text_success
            }
        }
        return {
            color: this.config.color_fail,
            value: this.config.text_fail
        }
    }

    calculateProgress(value) {
        if( value.estimatedDuration == undefined || value.estimatedDuration == null){
            return {
                color : this.config.color_progress,
                value : this.getProgressUnknown()
            }
        }
        let result = Math.floor(new Date()) - Number(value.timestamp);
        if (result >= value.estimatedDuration){
            return {
                color : this.config.color_progress,
                value : '99%'
            };
        }
        result = Math.floor((result/Number(value.estimatedDuration))*100)+'%';
        return {
            color : this.config.color_progress,
            value: result
        };
    }

    getProgressUnknown(){
        if(typeof this.config.text_progess_unknown == "string" ){
            return this.config.text_progess_unknown;
        }
        const len = this.config.text_progess_unknown.length;
        return this.config.text_progess_unknown[Math.floor(Math.random() * len)];
    }
}

exports.newParser = function (options) {
    return new JenkinsDataParser(options);
}