import './App.css'
import { useMemo, useState } from 'react';
import Counter from './component/Counter'

const nums = new Array(1000000).fill(0).map((_,i) => {
  return {
    index: i,
    favNum: i === 9500000
  }
})

function App() {

  // const [value, setValue] = useState(true);
  // const toggleBtn = () => {
  //   setValue(!value);
  // }

  const [count, setCount] = useState(0);
  const [numbers, setNumbers] = useState(nums);
  
  // expensive operation
  // const favNumber = numbers.find((item) => item.favNum === true);

  const favNumber = useMemo(() => numbers.find((item) => item.favNum === true),[numbers])

  return (
    <>
      {/* <button onClick={toggleBtn}>Toggle</button>
      {value && <Counter/>} */}
      <div>
        My fav number is: {favNumber?.index}
      </div>
      <div>
        Counter value: {count}
        
      </div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  )
}

export default App
