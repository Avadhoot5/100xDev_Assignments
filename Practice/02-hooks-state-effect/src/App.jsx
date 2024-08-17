import './App.css'
import { useState, useEffect } from 'react'
import Counter from './components/Counter';

function App() {
  
  const [value, setValue] = useState(true);

  const toggle = () => {
    setValue(!value);
  }


  return (
    <>
      <div>
        <button onClick={toggle}>Toggle</button>
      </div>
      {value && <Counter/>}

    </>
  )
}

export default App
