/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Print out the time it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function waitOneSecond() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('after 1 second');
        }, 1000);
    })
}

function waitTwoSecond() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('after 2 second');
        }, 2000);
    })
}

function waitThreeSecond() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('after 3 second');
        }, 3000);
    })
}

async function calculateTime() {
    let startTime = new Date().getTime();
    let res1 = await waitOneSecond();
    console.log(res1);
    let res2 = await waitTwoSecond();
    console.log(res2);
    let res3 = await waitThreeSecond();
    console.log(res3);
    let endTime = new Date().getTime();
    console.log((endTime - startTime) / 1000);
}

calculateTime();