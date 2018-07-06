#include <stdio.h>

#define print(arg) _print(#arg, arg)

inline void _print(char const *name, int x)
{
    printf("%s is %d\n", name, x);
}
