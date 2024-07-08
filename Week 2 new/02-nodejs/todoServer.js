/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const port = 3000;
const app = express();
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

// find Index of a specific ID 
function findAtIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (id === arr[i].id) {
      return i;
    }
  }
  return -1;
}

// #1 todos

app.get('/todos', (req, res) => {
  fs.readFile("data.js", "utf8", (err, data) => {
    if (err) throw err;
    else {
      const todos = JSON.parse(data);
      res.json(todos);
    }
  })
})

// #2 todos with id 

app.get('/todos/:id', (req, res) => {
  let todoID = req.params.id;
  fs.readFile("data.js", "utf8", (err, data) => {
    if (err) throw err;
    else {
      const todos = JSON.parse(data);
      let idIndex = findAtIndex(todos, parseInt(todoID))
      console.log(idIndex);
      if (idIndex === -1) res.status(404).send("todo item not found");
      else {
        res.json(todos[idIndex]);
      }
    }
  })
})

// #3 create new todo item with POST

app.post('/todos', (req, res) => {
  let todoId = Math.floor(Math.random() * 1000); // This will create a unique ID each time
  let todoObj = {
    id: todoId,
    title: req.body.title,
    description: req.body.description
  }
  fs.readFile("data.js", "UTF-8", (err, data) => {
    if (err) throw err;
    else {
      const todos = JSON.parse(data);
      todos.push(todoObj);
      fs.writeFile("data.js", JSON.stringify(todos), "UTF-8", (err) => {
        if (err) throw err;
        res.status(201).json(todos);
      })
    }
  })
})

// #4. put - Updating todo item by ID

app.put('/todos/:id', (req, res) => {
  let todoId = req.params.id;
  fs.readFile("data.js", "UTF-8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    let todoIndex = findAtIndex(todos, parseInt(todoId));
    if (todoIndex === -1) res.status(404).send("Not found");
    let updatedTodo = {
      id: todos[todoIndex].id,
      title: req.body.title,
      description: req.body.description
    }
    todos[todoIndex] = updatedTodo;
    fs.writeFile("data.js", JSON.stringify(todos), "UTF-8", (err) => {
      if (err) throw err;
    })
    res.status(200).send();
  })
})

// #5. delete - Delete a todo item by ID

app.delete('/todos/:id', (req, res) => {
  let todoId = req.params.id;
  fs.readFile("data.js", "UTF-8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    let todoIndex = findAtIndex(todos, parseInt(todoId));
    if (todoIndex === -1) res.status(404).send();
    else { 
      todos.splice(todoIndex, 1);
      fs.writeFile("data.js", JSON.stringify(todos), "utf-8", (err) => {
        if (err) throw err;
        res.status(200).send();
      })
    }
  })
})

app.listen(port, () => {
  console.log("Listening on port 3000");
})

module.exports = app;

/* OLD CODE - STATIC CODE
app.use(bodyParser.json());

// Reading the 'data' from data.js file

// #1 todos
app.get('/todos', (req,res) => {
  res.status(200).send(dataFile);
})

// #2 todos with id 
app.get('/todos/:id', (req,res) => {
  let idNum = req.params.id;
  let toDo = dataFile.find((value) => value.id === Number(idNum));
  if (toDo) {
    res.status(200).send(toDo);
  } else {
    res.status(404).send("Not Found");
  }
})

// #3 create new todo item with POST
app.post('/todos', (req,res) => {
  let receivedData = req.body;
  dataFile.push(receivedData);
  res.status(201).send(dataFile);

  // fs.appendFileSync("data.js", JSON.stringify(dataFile), "utf8");
  // fs.writeFile('data.js', JSON.stringify(data), "UTF-8", (err) => {
  //   if (err) console.log("not writen")
  // })
})

// #4. put - Updating todo item by ID
app.put('/todos/:id', (req, res) => {
  let idNum = req.params.id;
  let updatedData = req.body;
  let updateTodo = dataFile.find((value) => value.id === Number(idNum))
  console.log(updatedData);
  if (updateTodo !== undefined) {
    for (let i in updatedData) {
      updateTodo[i] = updatedData[i]
    }
    res.send(updateTodo);
  } else {
    res.status(404, 'Not found');
  }
})


// #5. delete - Delete a todo item by ID
app.delete('/todos/:id', (req, res) => {
  let idNum = req.params.id;
  let removeID = dataFile.filter((value) => value.id != Number(idNum));
  if (removeID.length < dataFile.length) {
    dataFile = removeID;
    res.status(200).send( `The todo item ${idNum} was found and deleted`);
  } else {
    res.status(404, 'Not found');
  }
})
*/
