const parser  = require('./parser_default');

test('parser default returns object', () => {
    const color = '#fff';
    const text = 'parser error';
    const config = {
        color_warning: color,
        text_parse_error: text
    }
    const defaultParser = parser.newParser(config);
    const result = defaultParser.parse();
    expect(result).toBeInstanceOf(Object);
});

test('parser default returns correct color', () => {
    const color = '#fff';
    const text = 'parser error';
    const config = {
        color_warning: color,
        text_parse_error: text
    }
    const defaultParser = parser.newParser(config);
    const result = defaultParser.parse();
    expect(result).toHaveProperty('color', color);
});

test('parser default returns correct value', () => {
    const color = '#fff';
    const text = 'parser error';
    const config = {
        color_warning: color,
        text_parse_error: text
    }
    const defaultParser = parser.newParser(config);
    const result = defaultParser.parse();
    expect(result).toHaveProperty('value', text);
});