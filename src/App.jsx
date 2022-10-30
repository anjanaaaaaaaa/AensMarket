import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { scanForWallets } from "./Connect";

function App() {
  const waiting = async () => {
    console.log("clicked");
    try {
      console.log("reached here");
      await scanForWallets();
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <div className="App">
      <button onClick={waiting}>Connect</button>
    </div>
  );
}

export default App;
