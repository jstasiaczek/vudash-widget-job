const parser  = require('./parser_concourse');

const config = {
    type                    : 'none',
    color_progress          : '#prog',
    color_success           : '#succ',
    color_fail              : '#fail',
    color_warning           : '#warn',
    text_success            : 'SUCCESS',
    text_fail               : 'FAIL',
    text_fail_count         : 'FAIL (%count%)',
    text_parse_error        : 'ERROR',
    text_progess_unknown    : ['..']
};

test('parser concourse returns object on incorrect value', () => {
    const defaultParser = parser.newParser(config);
    const result = defaultParser.parse("");
    expect(result).toBeInstanceOf(Object);
});

test('parser concourse returns object on empty array', () => {
    const defaultParser = parser.newParser(config);
    const result = defaultParser.parse([]);
    expect(result).toBeInstanceOf(Object);
});

test('parser concourse returns error value', () => {
    const defaultParser = parser.newParser(config);
    const result = defaultParser.parse([{}]);
    expect(result).toHaveProperty('value', config.text_parse_error);
    expect(result).toHaveProperty('color', config.color_warning);
});

test('parser concourse returns fail value', () => {
    const defaultParser = parser.newParser(config);
    const result = defaultParser.parse([{next_build: { status: 'failed'} }]);
    expect(result).toHaveProperty('value', config.text_fail);
    expect(result).toHaveProperty('color', config.color_fail);
});

test('parser concourse returns fail value with n-array', () => {
    const defaultParser = parser.newParser(config);
    const result = defaultParser.parse([{next_build: { status: 'succeeded'} }, {next_build: { status: 'failed'}, finished_build: { status: 'succeeded'} }]);
    expect(result).toHaveProperty('value', config.text_fail_count.replace('%count%', '1/2'));
    expect(result).toHaveProperty('color', config.color_fail);
});

test('parser concourse returns success value', () => {
    const defaultParser = parser.newParser(config);
    const result = defaultParser.parse([{finished_build: {  status: 'succeeded'} }]);
    expect(result).toHaveProperty('value', config.text_success);
    expect(result).toHaveProperty('color', config.color_success);
});

test('parser concourse returns success value with n-array', () => {
    const defaultParser = parser.newParser(config);
    const result = defaultParser.parse([{finished_build: {  status: 'succeeded'} }, {next_build: {  status: 'succeeded'} }]);
    expect(result).toHaveProperty('value', config.text_success);
    expect(result).toHaveProperty('color', config.color_success);
});

test('parser concourse returns progress dots', () => {
    const defaultParser = parser.newParser(config);
    const result = defaultParser.parse([{finished_build: {  status: 'started'} }]);
    expect(result).toHaveProperty('value', config.text_progess_unknown[0]);
    expect(result).toHaveProperty('color', config.color_progress);
});

test('parser concourse returns progress dots with n-array', () => {
    const defaultParser = parser.newParser(config);
    const result = defaultParser.parse([{next_build: {  status: 'started'} },{finished_build: {  status: 'succeeded'} }]);
    expect(result).toHaveProperty('value', config.text_progess_unknown[0]);
    expect(result).toHaveProperty('color', config.color_progress);
});


test('parser concourse returns progress with n-array', () => {
    const defaultParser = parser.newParser(config);
    const now = Math.floor(new Date() / 1000);
    const result = defaultParser.parse([
        {finished_build: {  status: 'succeeded'} },
        {
        finished_build: {
            end_time: Number(now),
            start_time: Number(now - 100)
        },
        next_build : {
            status: 'started',
            start_time: Number(now - 50)
        } 
    }]);
    expect(result).toHaveProperty('value', '50%');
    expect(result).toHaveProperty('color', config.color_progress);
});

test('parser concourse returns progress 99%', () => {
    const defaultParser = parser.newParser(config);
    const now = Math.floor(new Date() / 1000);
    const result = defaultParser.parse([{
        finished_build: {
            end_time: Number(now),
            start_time: Number(now - 100)
        },
        next_build : {
            status: 'started',
            start_time: Number(now - 150)
        } 
    }]);
    expect(result).toHaveProperty('value', '99%');
    expect(result).toHaveProperty('color', config.color_progress);
});
