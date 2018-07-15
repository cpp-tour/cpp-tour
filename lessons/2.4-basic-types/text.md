# Basic Types

As we've seen in the previous lesson, each variable declared needs to have a type
specified. C++ has a couple of basic types build into the language. They're split
into different categories.


## Integers

C++ has several integer types, of varying sizes:

- `char` (1 byte or larger)
- `short` (2 bytes or larger)
- `int` (4 bytes or larger)
- `long` (4 bytes or larger)
- `long long` (8 bytes or larger)

The sizes of each integer might vary from architecture or operating system, but
they're at least of a certain size, never less.

All integers declared in the source are `int` by default, unless otherwise
specified or to large to fit into an `int`.

Each of this integers exist in two variants, `signed`, which is the default if
not specified, and `unsigned`, which needs to be explicitly specified. Signed
integers can represent negative numbers, while unsigned integers can't. It's
wise to default to using `signed` integers in most cases.


## Floating Point

Integers can only represent whole numbers, if you want to represent fractional
values, you need to use a floating point type. There are three different
types of varying sizes:

- `float` (4 byte)
- `double` (8 byte)
- `long double` (larger)

Your default choice should be `float` here, they can represent most numbers
with a decent enough precision.
They don't exist in `signed` and `unsigned` variants. They can represent negative
numbers by default.


## Others

The following types are neither an integer or a floating point.

- `bool` - a boolean value, either `true` or `false`
- `void` - nothing. Cannot be declared directly

A `bool` is a simple boolean value, being able to represent `true` or `false`.
`void` is used to indicate nothing, for example for function return types.
It cannot be used as a type for a variable directly.

