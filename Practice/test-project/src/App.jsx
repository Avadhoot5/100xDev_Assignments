import './App.css'
import { useState } from 'react';
import Counter from './component/Counter'

function App() {

  const [value, setValue] = useState(true);

  const toggleBtn = () => {
    setValue(!value);
  }

  return (
    <>
      <button onClick={toggleBtn}>Toggle</button>
      {value && <Counter/>}
    </>
  )
}

export default App
