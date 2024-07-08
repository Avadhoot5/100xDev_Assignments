/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module

  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files

  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt

    - For any other route not defined in the server return 404

    Testing the server - run `npm run test-fileServer` command in terminal
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

const filePath = path.join(__dirname, "files");
const fileList = [];

fs.readdir(filePath, (err, files) => {
  if (err)
    return console.log("file not read");
  else {
    files.forEach((file) => {
      fileList.push(file);
    })
  }
});

// #1. GET /files 
app.get('/files', (req, res) => {
  let fileSend = [];
  fileList.forEach((file) => {
    fileSend.push({"fileName": file});
  })
  res.send(fileSend);
})

// #2. GET /file/:filename 
app.get('/file/:fileName', (req, res) => {
  let fName = req.params.fileName;
  if (fileList.includes(fName.toLowerCase())) {
    let fileSend = path.join(filePath, `${fName}`);
    res.sendFile(fileSend);
  }
  else {
    res.status(404).send("File not found");
  }
})

// app.use('/', (req, res) => {
//   res.send(404);
// })

app.listen(port, () => {
  console.log("App running on port 3000");
})

module.exports = app;
