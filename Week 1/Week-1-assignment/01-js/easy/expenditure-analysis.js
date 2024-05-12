/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]

  Once you've implemented the logic, test your code by running
  - `npm run test-expenditure-analysis`
*/

let transactions = [
  {itemName: "dettol", category: "washroom",price: 250},
  {itemName: "cinthol", category: "washroom",price: 399},
  {itemName: "amul cheese", category: "food",price: 130},
  {itemName: "Paneer", category: "food",price: 200},
];

function calculateTotalSpentByCategory(transactions) {
  let categoryTotal = {};
  transactions.forEach(transaction => {
    const {category, price} = transaction;
    if (categoryTotal[category]) {
      categoryTotal[category] += price;
    } else {
      categoryTotal[category] = price;
    }
  })
  let output = [];
  for (let i in categoryTotal) {
    output.push({[i]: categoryTotal[i]});
  }
  console.log(output);
}

calculateTotalSpentByCategory(transactions);

module.exports = calculateTotalSpentByCategory;






