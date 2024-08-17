
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  // const [list, setList] = useState('');

  // function str(s) {
  //   if (list.includes(s)) {
  //     setList((prev) => {
  //       return s + "->" + prev.replace(s+"->", "");
  //     });
  //   } else {
  //     setList((prev) => prev + s + "->");
  //   }
  // }

  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
    {/* <div style={{display: 'flex', flexDirection: 'column', gap: '10px', width: '20%'}}>
      <button onClick={() => str('a')}>a</button>
      <button onClick={() => str('b')}>b</button>
      <button onClick={() => str('c')}>c</button>
      <button onClick={() => str('d')}>d</button>
    </div>
    <br />
    <div>
      List:
      {list}
    </div> */}

    <div>
      {count}
    </div>
    </>
  )
}

export default App

// abcd. a -> b -> c -> d
