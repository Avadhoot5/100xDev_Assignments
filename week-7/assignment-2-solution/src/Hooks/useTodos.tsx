import { useEffect, useState } from "react";

function useTodos() {

  interface Todo {
      _id: string,
      title: string,
      description: string,
      done: boolean
  }

  type TodoArray = Todo[];

  const [todos, setTodos] = useState<TodoArray>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTodos = async () => {
        const response = await fetch('http://localhost:3000/todo/todos', {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        // Todo: Create a type for the response that you get back from the server
        const data : Todo[] = await response.json();
        setTodos(data);
        setLoading(false);
    };
    getTodos();
  }, []);
  
  return {
    loading,
    todos,
    setTodos
  }

}


export default useTodos;