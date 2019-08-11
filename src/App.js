import React from "react";
import VatCalculator from "./vc";
import "./style.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3474012/cooklogo.png"
          alt="cook logo"
        />
        <h1 className="App-title">Vat Calculator</h1>
      </header>
      <h2>
        <VatCalculator />
      </h2>
    </div>
  );
}

export default App;
