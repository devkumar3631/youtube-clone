import { useState, useEffect } from "react";

function Test() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`✨ Setup: Effect running for Count ${count}`);

    return () => {
      console.log(`🧹 Cleanup: Cleaning up Count ${count}`);
    };
  }, [count]); // Runs whenever 'count' changes

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}

export default Test;
