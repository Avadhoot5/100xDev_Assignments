/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/

function isPalindrome(str) {
  lowerStr = str.toLowerCase();
  let newStr = '';
  for (let i = lowerStr.length-1; i >= 0; i--) {
    newStr += lowerStr[i];
  }
  if (lowerStr === newStr)
    return true;
  else return false;
}

module.exports = isPalindrome;

let ans = isPalindrome('heleh');
console.log(ans);
