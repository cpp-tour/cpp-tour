"use strict"

import test from 'ava'

global.fetch = require('node-fetch')

import './helpers/babel.js'
import {compile} from '../src/js/compiler.js'

test('compile hello world', async t => {
    const CODE = "#include <iostream>\n\nint main() {\n\tstd::cout << \"Hello, world!\";\n\treturn 0;\n}"
    const response = await compile({code: CODE})

    t.is(response.program_output, 'Hello, world!')
    t.is(response.status, '0')
})

test('compile broken code', async t => {
    const CODE = "int main() {\n\tstd::cout << \"Hello, world!\";\n\treturn 0;\n}"
    const response = await compile({code: CODE})

    t.is(response.status, '1')
})

test('compile without code should throw', async t => {
    const error = await t.throws(() => compile({}))

    t.is(error, 'No code field in request!')
})
