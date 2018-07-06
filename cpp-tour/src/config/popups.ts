export default {
  'io/c/puts': {
    signature: 'int puts( char const *str );',
    description: `\
Writes every character from the null-terminated string <monospace>str</monospace> and one additional \
newline character <code>'\\n'</code> to the output stream <monospace>stdout</monospace>.`,
  },
  'preprocessor/include': {
    signature: '#include <filename>',
    description: `Includes other source file into current source file at the line immediately after the directive.`,
  },
};
