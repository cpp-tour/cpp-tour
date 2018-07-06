#include <iostream>

#define print(x) _print(#x, x)

template<class T>
inline void _print(char const *name, T x)
{
    std::cout << name << " is " << x << "\n";
}
