import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [input, setInput] = useState('default state');

  // Handle Event
  const submitInput = event =>
  {
    console.log(event);
    // setInput(event.value);
  }

  return (
    <div>
      <h1> This is the input </h1>
      <input placeholder='submit text here' onChange={(event) => setInput(event.target.value)}></input>
      <button onClick={submitInput}>Submit</button>
      <h1> This is the text: {input} </h1>
    </div>
  );
}

export default App;
