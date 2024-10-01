/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]

  Once you've implemented the logic, test your code by running
  - `npm run test-expenditure-analysis`
*/

function calculateTotalSpentByCategory(transactions) {
  let catValue = {};
  transactions.forEach((value) => {
    let {category, price} = value;
    if (catValue[category]) {
      catValue[category] += price;
    } else {
      catValue[category] = price;
    }
  })
  let output = [];
  for (let i in catValue) {
    output.push({category: i, totalSpent: catValue[i]});
  }
  return output;
}

module.exports = calculateTotalSpentByCategory;