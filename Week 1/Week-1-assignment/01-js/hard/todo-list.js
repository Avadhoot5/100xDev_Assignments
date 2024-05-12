/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
  - `npm run test-todo-list`
*/

class Todo {
  constructor() {
    let todoList = [];
    this.todoList = todoList;
  }
  add = (todo) => {
    this.todoList.push(todo);
    return this.todoList;
  }
  remove = (indexOfTodo) => {
    this.todoList.splice(indexOfTodo,1);
  }
  update = (index, updatedToDo) => {
    this.todoList.splice(index, 1,updatedToDo);
  }
  getAll = () => {
    for (let i of this.todoList) {
      console.log(i);
    }
  }
  get = (n) => {
    return this.todoList[n];
  }
  clear = () => {
    this.todoList.length = 0;
    return this.todoList;
  }
}
  

module.exports = Todo;

let TodoNew = new Todo();

TodoNew.add("make a routine");
TodoNew.add("wake up early");
TodoNew.add("Got to gym");

// TodoNew.update(1, "drink warm water");

console.log(TodoNew.getAll());

console.log(TodoNew.get(1));

console.log(TodoNew.clear());

