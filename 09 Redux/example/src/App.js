import { store } from './store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

import './App.css';

function Adder() {
  const [addend, setAddend] = useState(0)
  const sum = useSelector(s => s.sum)
  const dispatcher = useDispatch()

  const updateAddend = e => setAddend(parseInt(e.target.value))
  const add = () => dispatcher({type: 'add', payload: addend})
  const reset = () => dispatcher({type: 'reset'})

  return (<div>
    <div>Number to add: <input type = 'number' value={addend} onChange={updateAddend}/></div>
    <div>Sum: {sum}</div>
    <div>
      <button onClick={add}>Add</button>
      <button onClick={reset}>Reset</button>
    </div>
  </div>)
}

function App() {
  return (
    <Provider store = { store }>
      <h1>Adder</h1>
      <Adder/>
    </Provider>
  );
}

export default App;
