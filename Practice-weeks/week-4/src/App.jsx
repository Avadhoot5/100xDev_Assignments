import { useState, useEffect } from "react";

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

  const todos = useTodos();
  
  return (
    <>

    </>
  )
}

export default App
