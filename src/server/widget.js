'use strict'
const factory = require('./parser_factory');

const defaults = {
  description             : 'Job build status',
  font_ratio              : 6,
  type                    : 'none',
  color_progress          : '#3372e0',
  color_success           : '#85e055',
  color_fail              : '#ea0909',
  color_warning           : '#ed9f38',
  text_success            : 'SUCCESS',
  text_fail               : 'FAIL',
  text_fail_count         : 'FAIL (%count%)',
  text_parse_error        : '??',
  text_progess_unknown    : ['..', '...', '....', '.']
}

class StatusWidget {
  constructor (options) {
    this.config = Object.assign({}, defaults, options);
    this.parser = factory.newFactory(this.config).get(this.config.type);
  }

  update (value) {
    return { 
      value: this.parser.parse(value)
    }
  }
}

exports.register = function (options) {
  return new StatusWidget(options)
}
