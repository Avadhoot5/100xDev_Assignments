/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
  - `npm run test-calculator`
*/

const { error } = require("console");

class Calculator {
  constructor(result) {
    this.result= result;
  }
  add = function(n) {
    this.result = this.result + n;
    // console.log(this.result);
  }
  sub = function(n) {
    this.result = this.result - n;
  }
  mul = function(n) {
    this.result = this.result * n;
  }
  div = function(n) {
    this.result = (Math.floor(this.result / n));
  }
  clear = function() {
    return this.result = 0;
  }
  alphaCheck = function(newS) {
    return /^[0-9+-/*()]+$/.test(newS);
  }
  expression = (s) => {
    let newS = '';
    for (let i of s) {
      newS += i.trim();
    }
    if (this.alphaCheck(newS)) {
      console.log(eval(newS));
    }
    else {
      console.log("Please enter a valid string");
    }
  }
}

let calculate = new Calculator(10);

calculate.add(5);
console.log(calculate.result);
calculate.sub(2);
console.log(calculate.result);
calculate.mul(5);
console.log(calculate.result);
calculate.div(10);
console.log(calculate.result);
calculate.clear();
console.log(calculate.result);

calculate.expression(' (32*32)- 192 +   2923 - 23  0   ');

module.exports = Calculator;
