import React from 'react'

const Todo = ({title, description}) => {
  return ( 
    <div>
        <b>Title:</b> {title}
        <br />
        <b>Desc:</b> {description}
        <button onClick={() => {
            fetch("http://localhost:3000/todos/:id", {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
                })
        }}>Delete</button>
        <br />
    </div>
  )
}

export default Todo