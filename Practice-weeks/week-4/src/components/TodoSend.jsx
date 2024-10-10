import { useState } from "react";
import styled from "styled-components";

function TodoSend({setTodos}) {


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const addTodo = async () => {
        try {
            const response = await fetch("http://localhost:3000/todos/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description
                })
            });
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.log("todo not sent");
        }
    }

  return (
    <>
        <TodoContainer>
            <Box>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" onChange={(e) => {
                    setTitle(e.target.value);
                }}/>
            </Box>
            <Box>
                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description" onChange={(e) => {
                    setDescription(e.target.value);
                }}/>
            </Box>
            <Button onClick={() => addTodo()}>Add Todo</Button>
        </TodoContainer>
    </>
  )
}

const TodoContainer = styled.div`
    background-color: black;
    color: white;
    min-height: 150px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;

`

const Box = styled.div`
    font-size: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    
    input {
        min-width: 250px;
        font-size: 15px;
        border-radius: 15px;
        border: 0;
        height: 35px;
        padding: 10px;
        background: #545454;
    }

`

const Button = styled.button`
    margin-top: 5px;
    margin-bottom: 10px;
    font-size: 18px;
    padding: 5px 10px;
    border-radius: 20px;
    transition: 0.3s background ease-out;

    cursor: pointer;
    &:hover{
        background-color: aqua;
        transition: 0.3s background ease-in;
        font-weight: 600;
    }
`


export default TodoSend;