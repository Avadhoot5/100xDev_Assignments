import {useState, useEffect} from 'react'

function Counter() {

    // state variable, setter function
  const [counter, setCounter] = useState(0);

  // callback function, dependency array
  useEffect(() => {
    console.log("rendered first time");

    return () => {
      console.log("Unmounted the component");
    }

  },[])

  useEffect(() => {
    console.log("Counter rendering!", counter);

    return () => {
        console.log("Unmounted Counter", counter);
      }

  },[counter])

  let IncrementCtr = () => {
    setCounter(counter+1);
  }

  let DecrementCtr = () => {
    if (counter === 0) return;
    setCounter(counter-1);
  }

  return (
    <>
    <h1>
        Counter: {counter}
      </h1>
      <div style={{display: 'flex', gap:'10px'}}>
        <button onClick={IncrementCtr}>Increment</button>
        <button onClick={DecrementCtr}>Decrement</button>
      </div>
    </>
  )
}

export default Counter;