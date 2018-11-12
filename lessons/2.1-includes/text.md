# Includes

Functions of the [C++ standard library] are declared in header files, the function
[`puts`], for example, is declared inside [`cstdio`].

To get access to the function, we need to use the [`#include`] statement.
In the example, [`cstdio`] is included, which will make the standard input
and output routines available for use.

One of the functions declared is [`puts`]. It's declared in the namespace `std`.

[`puts`] is taking a single string argument, and printing it to the console.

Try changing the string, or adding more calls to [`puts`]. You'll see the output
of the program in the console.


[C++ standard library]: https://en.cppreference.com/w/cpp
[`#include`]: https://en.cppreference.com/w/cpp/preprocessor/include
[`cstdio`]: https://en.cppreference.com/w/cpp/header/cstdio
[`puts`]: https://en.cppreference.com/w/cpp/io/c/puts

