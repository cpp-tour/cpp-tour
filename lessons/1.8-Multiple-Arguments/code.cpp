#include <iostream>


namespace tour {

char const exclaim = '!';

void print_the_answer(int answer, char punctuation) {
  std::cout << answer << punctuation;
}

}


int main() {
  int the_answer = 42;
  tour::print_the_answer(the_answer, tour::exclaim);
  return 0;
}
