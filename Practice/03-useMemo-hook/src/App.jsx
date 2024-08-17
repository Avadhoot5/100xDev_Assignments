
import './App.css'
import { useState, useMemo } from 'react';

const nums = new Array(10000000).fill(0).map((_, i) => {
  return ({
    index: i,
    favNum: i === 9000000
  })
})

function App() {

  const [count, setCount] = useState(0);

  const [number, setNumber] = useState(nums);

  // expensive operation 
  // const myNumber = number.find((item) => item.favNum === true);
  
  const myNumber = useMemo(() => number.find((item) => item.favNum === true), [number])

  return (
    <>
      <div>
        My Favourite number is: {myNumber.index}
      </div>
      <div>
        <h1>Value of Count is: {count}</h1>
      </div>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>Increment</button>
      </div>
    </>
  )
}

export default App
