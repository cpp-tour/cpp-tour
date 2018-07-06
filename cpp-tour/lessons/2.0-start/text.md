# Program Start

Every C++ program needs to have a function called `main`. This is where the
execution starts. The function signature of `main` is `int main()`, meaning it
returns an `int` (an integral value, more about types later) and takes zero
arguments.

In the example you can see `main` is returning the value `0`. This return value
is communicated back to your environment. By convention, the value `0` indicates
success, while any other value indicates failure.

Since returning `0` from `main` is so common, it can be omitted, in which case
the return value is automatically zero. Any other value still needs to be
explicitly returned. Try running the code, and changing the return value.
It will be reflected in the output on the bottom.

A program only returning a single integer values is rarely useful. Go to the
next lesson to learn about including functions to print to the console.

[`puts`]: https://en.cppreference.com/w/cpp/io/c/puts
