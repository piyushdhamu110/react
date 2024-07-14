import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

function App() {
  const [length, setLength] = useState(6);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let result = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (charAllowed) {
      str += "~!@#$%^&*()_+{}[]:;'?/<>,.";
    }
    if (numberAllowed) {
      str += "1234567890";
    }

    for (let index = 1; index <= length; index++) {
      result += str.charAt(Math.floor(Math.random() * str.length));
    }

    setPassword(result);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);

  return (
    <>
      <div>
        <div>
          <h1>Passowrd Generator</h1>
          <input type="text" placeholder="Password" readOnly value={password} />
        </div>
        <div>
          <div>
            <input
              type="range"
              min={5}
              max={15}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="Character"
              onChange={(e) => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="Character">Character</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="Number"
              defaultChecked={numberAllowed}
              onChange={(e) => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="Number">Number</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
