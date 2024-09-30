// ## Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require('fs');

const data = 'hello this is an example to write to a file';

fs.writeFile('new.txt', data, 'utf-8', (err, data) => {
    if (err) return err;
    if (data) return 'Written sucess!';
})