#include <iostream>
#include "libs/big-number/big-number.h"
#include "libs/expression-evaluation/expression-evaluation.h"

int main(int argc, char** argv) {
    std::cout << evaluate(std::string(argv[1])) << std::endl;
}