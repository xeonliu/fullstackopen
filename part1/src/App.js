import { useState } from "react";

// Further deconstruct :
// const Hello = ({name,age})=>{}
const Hello = (props) => {
  // deconstruct
  const { name, age } = props;
  const bornYear = () => {
    // why new?
    const yearNow = new Date().getFullYear();
    return yearNow - props.age;
  };

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  );
};

const App = () => {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    console.log("clicked");
    setCounter(counter + 1);
  };

  const now = new Date();
  const a = 10;
  const b = 20;

  return (
    <div>
      <div>{counter}</div>
      <button onClick={handleClick}>plus</button>
      <button onClick={() => setCounter(0)}>zero</button>
      <p>Hello world, it is {now.toDateString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
      <h1>Greetings</h1>
      <Hello name="GG" age={a} />
      <Hello name="SB" age={b} />
      {/* <Hello /> */}
    </div>
  );
};

export default App;
