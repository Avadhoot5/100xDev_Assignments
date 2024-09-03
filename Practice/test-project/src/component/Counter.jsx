import react, {useEffect, useState} from "react";

const Counter = () => {

    const [counter, setCounter] = useState(0);

    // the react component life cycle
    useEffect(() => {
        console.log("component mounted");

        return () => {
            console.log("component unmounted");
        }
    }, [])

    useEffect(() => {
        console.log("counter mounted", counter);

        return () => {
            console.log('counter unmounted', counter);
        }
    }, [counter])
    
    
    const incrementCtr = () => {
        setCounter(counter + 1);
    }
    const decrementCtr = () => {
        if (counter === 0) return;
        setCounter(counter - 1);
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column',
            maxWidth: '150px', alignItems: 'center'}}>
            <div>
                <h1>{counter}</h1>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <button onClick={incrementCtr} > Increment </button>
                <button onClick={decrementCtr} > Decrement </button>
            </div>
        </div>
    )
}

export default Counter;