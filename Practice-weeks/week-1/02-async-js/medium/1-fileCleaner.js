const fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    if (err) return err;
    let temp = data.split(' ');
    let newArr = temp.filter((a) => a!== '');
    let output = newArr.join(' ');
    fs.writeFile('output.txt', output, 'utf-8', (err, data) => {
        if (!err) console.log('Write sucess!');
    })
})


