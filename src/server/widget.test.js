const widget = require('./widget');


test('widget return error on empty object', () => {
    const response = 'ERR';
    const job = widget.register({type: 'default', text_parse_error: response});
    const result = job.update({});

    expect(result).toHaveProperty('value.value', response);
});

test('widget return success on type jenkins', () => {
    const response = 'SUCCESS';
    const job = widget.register({type: 'jenkins', text_success: response});
    const result = job.update({building: false, result: 'SUCCESS'});

    expect(result).toHaveProperty('value.value', response);
});

test('widget return success on type concourse', () => {
    const response = 'SUCCESS';
    const job = widget.register({type: 'concourse', text_success: response});
    const result = job.update([{finished_build: {  status: 'succeeded'} }]);

    expect(result).toHaveProperty('value.value', response);
});