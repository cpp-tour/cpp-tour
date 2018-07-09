#include <iostream>


namespace tour {

char const exclaim = '!';

void print_the_answer(int answer) {
  std::cout << answer << tour::exclaim;
}

}


int main() {
  int the_answer = 42;
  tour::print_the_answer(the_answer);
  return 0;
}
