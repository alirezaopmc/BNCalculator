/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2020 Alireza Jafartash
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
 * to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
 * AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF
 * OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/*
 * Author: Alireza Jafartash
 * Github: https://github.com/sleepingjempa
 */

#include <iostream>
#include <stack>

#include "expression-evaluation.h"

int precedence(char _operator) {
	if(_operator == '+'|| _operator == '-') return 1; 
	if(_operator == '*'|| _operator == '/') return 2;
	return 0; 
}

BigNumber handleOperator(BigNumber b1, BigNumber b2, char _operator) {
    switch (_operator) {
        case '+':
            return b1.add(b2);
        case '-':
            return b1.subtract(b2);
        case '*':
            return b1.multiply(b2);
        case '/':
            return b1.divide(b2);
        default:
            return 0;
    }
}

BigNumber evaluate(std::string tokens) {
    std::stack<BigNumber> values;
    std::stack<char> operators;

    for (int i = 0; i < tokens.length(); ++i) {
        if (tokens[i] == ' ') {
            continue;
        } else if (tokens[i] == '(') {
            operators.push('(');
        } else if (isdigit(tokens[i])) {
            std::string value;
            while (i < tokens.length() && isdigit(tokens[i])) {
                value += tokens[i++];
            }
            --i;
            values.push(BigNumber(value));
        } else if (tokens[i] == ')') {
            while(!operators.empty() && operators.top() != '(') {
                BigNumber valueB = values.top();
                values.pop();

                BigNumber valueA = values.top();
                values.pop();

                char _operator = operators.top();
                operators.pop();

                values.push(handleOperator(valueA, valueB, _operator));
            }
            if (!operators.empty()) operators.pop();
        } else {
            while(!operators.empty() && precedence(operators.top()) >= precedence(tokens[i])) {
                BigNumber valueB = values.top();
                values.pop();

                BigNumber valueA = values.top();
                values.pop();

                char _operator = operators.top();
                operators.pop();

                values.push(handleOperator(valueA, valueB, _operator));
            }
            operators.push(tokens[i]);
        }
    }

    while (!operators.empty()) {
        BigNumber valueB = values.top();
        values.pop();

        BigNumber valueA = values.top();
        values.pop();

        char _operator = operators.top();
        operators.pop();

        values.push(handleOperator(valueA, valueB, _operator));
    }

    return values.top();
}