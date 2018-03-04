const parser  = require('./parser_jenkins');

const config = {
    type                    : 'none',
    color_progress          : '#prog',
    color_success           : '#succ',
    color_fail              : '#fail',
    color_warning           : '#warn',
    text_success            : 'SUCCESS',
    text_fail               : 'FAIL',
    text_parse_error        : 'ERROR',
    text_progess_unknown    : ['..', '...', '....', '.']
};

const successValue = {
    building: false,
    result: "SUCCESS"
};

const failValue = {
    building: false,
    result: "FAILED"
};

const progressUnknownValue = {
    building: true,
    result: null
}

test('parser jenkins returns object on incorrect value', () => {
    const defaultParser = parser.newParser(config);
    const result = defaultParser.parse("");
    expect(result).toBeInstanceOf(Object);
});

test('parser jenkins returns object on empty object', () => {
    const defaultParser = parser.newParser(config);
    const result = defaultParser.parse({});
    expect(result).toBeInstanceOf(Object);
});

test('parser jenkins returns fail value', () => {
    const defaultParser = parser.newParser(config);
    const result = defaultParser.parse({});
    expect(result).toHaveProperty('value', 'FAIL');
    expect(result).toHaveProperty('color', '#fail');
});

test('parser jenkins returns success', () => {
    const defaultParser = parser.newParser(config);
    const result = defaultParser.parse(successValue);
    expect(result).toHaveProperty('value', 'SUCCESS');
    expect(result).toHaveProperty('color', '#succ');
});

test('parser jenkins returns array dots on progress', () => {
    const dots = '...';
    const conf = Object.assign({}, config);
    conf.text_progess_unknown = [dots]
    const defaultParser = parser.newParser(conf);
    const result = defaultParser.parse(progressUnknownValue);
    expect(result).toHaveProperty('value', dots);
    expect(result).toHaveProperty('color', '#prog');
});


test('parser jenkins returns string dots on progress', () => {
    const dots = '...';
    const conf = Object.assign({}, config);
    conf.text_progess_unknown = dots;
    const defaultParser = parser.newParser(conf);
    const result = defaultParser.parse(progressUnknownValue);
    expect(result).toHaveProperty('value', dots);
    expect(result).toHaveProperty('color', '#prog');
});

test('parser jenkins returns progress', () => {
    progressValue = Object.assign({}, progressUnknownValue);
    progressValue.estimatedDuration = 999488;
    progressValue.timestamp = Math.floor(new Date()) - Math.floor(progressValue.estimatedDuration / 2);

    const defaultParser = parser.newParser(config);
    const result = defaultParser.parse(progressValue);
    expect(result).toHaveProperty('value', '50%');
    expect(result).toHaveProperty('color', '#prog');
});

test('parser jenkins returns fail', () => {
    const defaultParser = parser.newParser(config);
    const result = defaultParser.parse(failValue);
    expect(result).toHaveProperty('value', 'FAIL');
    expect(result).toHaveProperty('color', '#fail');
});

