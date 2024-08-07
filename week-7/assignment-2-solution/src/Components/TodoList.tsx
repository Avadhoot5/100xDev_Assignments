import { useState, useEffect } from 'react';
import { authState } from '../store/authState.ts';
import {useRecoilValue} from "recoil";
import { useNavigate } from 'react-router-dom';
import useTodos from '../Hooks/useTodos.tsx';

const TodoList = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const authStateValue = useRecoilValue(authState);
    const navigate = useNavigate();
    const {loading, todos, setTodos} = useTodos();

    const addTodo = async () => {
        const response = await fetch('http://localhost:3000/todo/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ title, description })
        });
        const data = await response.json();
        setTodos([...todos, data]);
    };

    const markDone = async (id: string) => {
        const response = await fetch(`http://localhost:3000/todo/todos/${id}/done`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const updatedTodo = await response.json();
        setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
    };

    return (
        <div>
            <div style={{display: "flex"}}>
                <h2>Welcome {authStateValue.username}</h2>
                <div style={{marginTop: 25, marginLeft: 20}}>
                    <button onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                    }}>Logout</button>
                </div>
            </div>
            <h2>Todo List</h2>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                maxWidth: '30%'
            }}>
            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
            <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
            <button style={{width: 80}} onClick={addTodo}>Add Todo</button>
            </div>
            {todos.map((todo) => (
                <div key={todo._id}>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                    <button onClick={() => markDone(todo._id)}>{todo.done ? 'Done' : 'Mark as Done'}</button>
                </div>
            ))}
        </div>
    );
};

export default TodoList;
