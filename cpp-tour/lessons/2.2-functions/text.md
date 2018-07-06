# Functions

Functions are used to encapsulate a piece of code for easy reusability. They
take zero or more arguments, and return a single value.

The general syntax to declare a function is:

```cpp
Type name(ArgumentType argumentName, ArgumentType argumentName)
{
  /* code */
}
```

Arguments are optional. If the function returns no value, the type of the return
value should be specified as `void`.

The function `greet`, in our example, takes no arguments, and is returning no
value, hence the return type of `void`, and empty parantheses.

It is called directly from main. If the end of a function is reached, execution
jumps back to the point where the function was originally called.
