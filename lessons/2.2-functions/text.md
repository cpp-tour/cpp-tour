# Functions

Functions are used to encapsulate a piece of code. They take zero or more
arguments, and return a single value.

The general syntax to declare a function is:

```cpp
Type Name(ArgumentType argumentName, ArgumentType argumentName)
{
  /* code */
}
```

Every function needs to have a *signature*, the return type, and types and numbers
of arguments. Arguments are optional. If the function returns no value, the
type of the return value needs to be specified as `void`.

The function `greet`, in our example, takes no arguments, and is returning no
value. Indicated by empty parantheses and the return type of `void`.

If the end of a function is reached, execution jumps back to the point where
the function was originally called. In our example, `greet` is called from `main`,
prints `Hello!` to the console, and continues executing `main`. Since the end of
`main` is reached, it automatically returns zero and terminates our program.

Go to the next lesson to learn about how to declare and use variables.
