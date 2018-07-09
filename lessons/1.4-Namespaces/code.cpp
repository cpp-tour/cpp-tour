#include <iostream>


namespace tour {

char const exclaim = '!';

}


int main() {
  int the_answer = 42;
  std::cout << the_answer << tour::exclaim;
}
