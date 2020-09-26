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