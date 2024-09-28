/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/

function isPalindrome(str) {
  let newStr = '';
  for (let i = str.length-1; i >= 0; i--) {
    newStr = newStr + str[i];
  }
  return (
    newStr.toLowerCase().replace(/[\.,?!]/g, "").replaceAll(" ", "") === str.toLowerCase().replace(/[\.,?!]/g, "").replaceAll(" ", "")
  )
}


module.exports = isPalindrome;
