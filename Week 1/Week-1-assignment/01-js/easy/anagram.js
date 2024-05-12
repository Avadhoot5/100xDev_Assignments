/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.

  Once you've implemented the logic, test your code by running
  - `npm run test-anagram`
*/

function isAnagram(s, t) {
  let sortS = (s) => {
    return s.split("").sort().join("");
  }
  let sortT = (t) => {
    return t.split("").sort().join("");
  }
  return sortS(s) === sortT(t);
}

module.exports = isAnagram;

let ans = isAnagram("car", "rac");
console.log(ans);



  // Method 1 
  // if (s.length !== t.length) {
  //   return false;
  // }
  // let sNew = {};
  // let tNew = {};
  // for (let i of s) {
  //   sNew[i] = (sNew[i] || 0) + 1;
  // }
  // for (let i of t) {
  //   tNew[i] = (tNew[i] || 0) + 1;
  // }
  // let sortS = Object.keys(sNew).sort((a,b) => {
  //   if (a > b) return 1;
  //   if (a < b) return -1;
  //   else return 0;
  // });
  // let sortT = Object.keys(tNew).sort((a,b) => {
  //   if (a > b) return 1;
  //   if (a < b) return -1;
  //   else return 0;
  // });
  // let finalS = {};
  // let finalT = {};
  // for (let i of sortS) {
  //   finalS[sortS[i]] = sNew[sortS[i]];
  // }
  // for (let i of sortT) {
  //   finalT[sortT[i]] = tNew[sortT[i]];
  // }
  // // return finalS === finalT;
  // return JSON.stringify(finalS) === JSON.stringify(finalT);