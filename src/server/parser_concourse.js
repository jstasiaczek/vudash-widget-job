'use strict';

class ConcourseDataParser {
    constructor(config){
        this.config = Object.assign({}, config);
        this.type = 'concourse';
        this.statuses = ['failed', 'aborted', 'started', 'succeeded']
    }

    parse(value){
        if(!(value instanceof Array) || value.length <= 0){
            return {
                value : this.config.text_parse_error,
                color: this.config.color_warning
            };
        }
        return this.getResult(value);
    }

    getCurrentStatus(value){
        for (let x =0; x < this.statuses.length; x++){
            let status = this.statuses[x];
            for (let i = 0; i < value.length; i++){
                const result = this.getCurrentJobStatus(value, i, status);
                if(result.id >= 0){
                    return result;
                }
            }
        }
        return {status: '-', id: -1 };
    }

    getCurrentJobStatus(value, i, status){
        let build = value[i].next_build;
        if(build == null){
            build = value[i].finished_build;
        }
        if(build != null && build.status == status){
            return { status: build.status, id: i};
        }
        return {status: '-', id: -1};
    }

    getResult(value){
        const {status, id} = this.getCurrentStatus(value);

        if(id < 0){
            return {
                value : this.config.text_parse_error,
                color: this.config.color_warning
            }
        }

        if(status == "started"){
            return {
                color: this.config.color_progress,
                value: this.calculateProgress(value, id)
            }
        }
        if(status == 'succeeded'){
            return {
                color: this.config.color_success,
                value: this.config.text_success
            }
        }
        return {
            color: this.config.color_fail,
            value: this.renderFailCount(value)
        };
    }

    renderFailCount(value) {
        const count = value.length;
        if(value.length <= 1){
            return this.config.text_fail;
        }
        let failCount = 0;
        for (let i = 0; i < value.length; i++){
            const result = this.getCurrentJobStatus(value, i, 'failed');
            if(result.id >= 0){
                failCount += 1;
            }
        }
        const result = failCount+"/"+count;
        return String(this.config.text_fail_count).replace('%count%', result);
    }
    
    calculateProgress(value, id) {
        if(value[id].next_build == null || value[id].finished_build == null){
            return this.getProgressUnknown();
        }
        const estimate = Number(value[id].finished_build.end_time) - Number(value[id].finished_build.start_time);
        let result = Math.floor(new Date() / 1000) - Number(value[id].next_build.start_time);
        if (result >= estimate){
        return "99%";
        }
        return Math.floor((result/Number(estimate))*100)+"%";
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
    return new ConcourseDataParser(options);
}