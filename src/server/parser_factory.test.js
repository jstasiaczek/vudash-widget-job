const factory = require('./parser_factory')

test('factory return default parser', () => {
    const parser = factory.newFactory({}).get('default');

    expect(parser).toHaveProperty('type', 'default');
});

test('factory return default parser on incorrect type', () => {
    const parser = factory.newFactory({}).get('incorrect_type');

    expect(parser).toHaveProperty('type', 'default');
});


test('factory return jenkins parser', () => {
    const parser = factory.newFactory({}).get('jenkins');

    expect(parser).toHaveProperty('type', 'jenkins');
});