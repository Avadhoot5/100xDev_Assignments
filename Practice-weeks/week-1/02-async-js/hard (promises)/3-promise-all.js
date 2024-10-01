/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Print how long it took for all 3 promises to resolve.
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
            resolve('after 2 second')
        }, 2000);
    })
}

function waitThreeSecond() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('after 3 second')
        }, 3000);
    })
}

function calculateTime() {
    const startTime = new Date().getTime();
    const ans = Promise.all([waitOneSecond(), waitTwoSecond(), waitThreeSecond()])
    return ans.then((res) => {
        const endTime = new Date().getTime();
        console.log(res);
        const time = (endTime - startTime)/1000;
        console.log(time);
    })
}

calculateTime();