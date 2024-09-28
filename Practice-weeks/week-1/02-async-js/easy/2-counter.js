// ## Counter without setInterval

// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck.

let ctr = 0;

function counter() {
    setTimeout(() => {
        console.clear();
        console.log(ctr);
        ctr++;
        counter();
    }, 1000);
}

counter();