#include <iostream>


namespace tour {

char const exclaim = '!';

void print_the_answer() {
  int the_answer = 42;
  std::cout << the_answer << tour::exclaim;
}

}


int main() {
  tour::print_the_answer();
}
