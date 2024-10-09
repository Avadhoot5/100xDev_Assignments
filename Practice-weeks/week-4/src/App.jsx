import { useEffect, useState } from 'react'
import './App.css'
import Todo from './components/Todo';

function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todos", {
      method: "GET"
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setTodos(data)
      })
    });
    setInterval(() => {
      fetch("http://localhost:3000/todos", {
        method: "GET"
      }).then((res) => {
        res.json().then((data) => {
          console.log(data);
          setTodos(data)
        })
      })
    }, 2000);
  }, [])

  return todos;
}

function App() {
  // hook 
  // useEffect only runs once - hence the setTimeout, interval methods run as expected.
  // useEffect(() => {
  //   console.log("hello from use effect");
  // }, [])
  // 
  // useEffect(() => {
  //   setTimeout(() => {
  //     setTodos([{
  //       title: "updated walk",
  //       description: "update walk in morning",
  //       id: 1
  //     },{
  //       title: "updated to gym",
  //       description: "updated gym in morning",
  //       id: 2
  //     }])
  //   },2000)
  // },[])

  const todos = useTodos();
  return (
    <> 
      <h2>Hello There!</h2>
      {todos.map((todo) => {
        return <Todo title = {todo.title} description = {todo.description}></Todo>
      })}

      {/* <PersonName firstName = {"Test"} lastName = {"Name"} ></PersonName> */}
    </>
  )
}


// above Todo component is linked to week 2 - todoserver.js file 

// function PersonName(props) {
//   return <div>
//     {props.firstName} {props.lastName}
//   </div>
// }

export default App
